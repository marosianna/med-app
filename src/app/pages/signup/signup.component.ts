import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  });

  onSubmit(){
    console.log(this.signUpForm.value);
    this.authService.signUp(this.signUpForm.get('email')?.value as string, this.signUpForm.get('password')?.value as string).then(cred =>{
      console.log(cred);
    }).catch(error =>{
      console.error(error);
    });
  }

  constructor(private location: Location, private authService: AuthService){

  }

  goBack(){
    this.location.back();
  }

}
