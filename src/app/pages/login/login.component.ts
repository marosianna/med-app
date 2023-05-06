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
}
