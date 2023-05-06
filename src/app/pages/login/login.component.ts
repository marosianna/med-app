import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
});

  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;

  loading: boolean = false;

  get email() {
    return this.loginForm.get('email');
  }
  
  get password() {
    return this.loginForm.get('password');
  }
  

  constructor(private router: Router, private authService: AuthService){

  }

  async login(){
    this.loading = true;
    await this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
    this.authService.login(this.email?.value as string, this.password?.value as string).then(cred =>{
      console.log(cred);
      this.router.navigateByUrl('/main');
      this.loading = false;
    }).catch(error =>{
      console.error(error);
      this.loading = false;
    });
  } else {
    console.error('Az űrlap érvénytelen!');
    this.loading = false;
  }
  }
  
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
   /* this.loadingObservation = this.loadingService.loadingWithObservable(this.email.value, this.password.value)
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
      ngOnDestroy(){
        this.loadingSubscription?.unsubscribe();
    }
    */
     
}
