import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = new FormControl('');
  password = new FormControl('');

  constructor(private router: Router){

  }

  login(){
    if(this.email.value === 'test@gmail.com' && this.password.value === 'testpw'){
        this.router.navigateByUrl('/main');
    }else{
      console.error('incorrect email or password!');
    }
  }

}
