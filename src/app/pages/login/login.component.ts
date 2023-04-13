import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FakeLoadingService } from '../../shared/services/fake-loading.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  email = new FormControl('');
  password = new FormControl('');

  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;

  loading: boolean = false;

  constructor(private router: Router, private loadingService: FakeLoadingService){

  }

  async login(){
    this.loading = true;
   /* // promise, aszinkron
    this.loadingService.loadingWithPromise(this.email.value, this.password.value).then((_: boolean) => {
      this.router.navigateByUrl('/main');
    }).catch(error => {
        console.error('incorrect email or password!');
    }).finally(() => {
      console.log('finally')
    });
    

    // aszinkron fv, awaittel -> szinkron mód
    try{
    const bool = await this.loadingService.loadingWithPromise(this.email.value, this.password.value)
    }catch(error) {
        console.error('incorrect email or password!');
    }
*/
    // observable
    this.loadingObservation = this.loadingService.loadingWithObservable(this.email.value, this.password.value)
    this.loadingSubscription = this.loadingObservation
      .subscribe(
        {
          next: (data: boolean) => {
            this.router.navigateByUrl('/main');
          }, error: (error) => {
            console.error(error);
            this.loading = false;
          }, complete: () => {
            console.log('finally');
            this.loading = false;
          }
        }
      );
  }
  ngOnDestroy(){
    this.loadingSubscription?.unsubscribe();
  }
}
