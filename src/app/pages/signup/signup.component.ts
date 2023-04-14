import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/User';
import { EmailAuthCredential } from '@angular/fire/auth';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  loading: boolean = false;

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
    this.loading = true;
    console.log(this.signUpForm.value);
    this.authService.signUp(this.signUpForm.get('email')?.value as string, this.signUpForm.get('password')?.value as string).then(cred =>{
      console.log(cred);
      const user: User = {
        id: cred.user?.uid as string,
        email: this.signUpForm.get('email')?.value as string,
        username: this.signUpForm.get('email')?.value?.split('@')[0] as string,
        name: {
          firstname: this.signUpForm.get('name.firstname')?.value as string,
          lastname: this.signUpForm.get('name.lastname')?.value as string
        }
      };
      this.userService.create(user).then(_ =>{
        console.log('A felhasználó sikeresen hozzá lett adva az adatbázishoz!')
        this.router.navigateByUrl('/main');
        this.loading = false;
      }).catch(error =>{
        console.error(error);
      });
    }).catch(error =>{
      console.error(error);
    });
  }

  constructor(private location: Location, private authService: AuthService, private userService: UserService, private router: Router){

  }

  goBack(){
    this.location.back();
  }

}
