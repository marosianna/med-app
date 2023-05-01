import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../../shared/models/User';
import { Router } from '@angular/router';
import { GalleryService } from '../../shared/services/gallery.service';
import { UserService } from '../../shared/services/user.service';
import { AppointmentService } from '../../shared/services/appointment.service';
import { Appointment } from '../../shared/models/Appointment';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  user?: User;
  users: Array<any> = [];

  appointments: Array<any> = []; 

  constructor(
    private fb: FormBuilder,
    private router: Router, 
    private galleryService: GalleryService, 
    private userService: UserService,
    private appointmentService: AppointmentService){}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(data =>{
      this.user = data;
      this.userForm.get('username')?.setValue(this.user?.username);
      this.userForm.get('email')?.setValue(this.user?.email);
    this.appointmentService.getAppointmentsByUsername(this.user?.username).subscribe(data2 =>{
      this.appointments = data2;
    });
      
    }, error =>{
      console.error(error);
    });
   
    
  }

  userForm = this.createForm({
    id: '',
    email: '',
    username: '',
    name: {
      firstname: '',
      lastname: ''
  }

  });

  appointmentsForm = this.createFormApp({
    id: '',
    username: '',
    date: 0,
    comment: '',
    time: '',
  });

  createFormApp(model: Appointment){
    let formGroup = this.fb.group(model);
    formGroup.get('username')?.addValidators([Validators.required]);
    formGroup.get('date')?.addValidators([Validators.required]);
    formGroup.get('comment')?.addValidators([Validators.required, Validators.minLength(20)]);
    formGroup.get('time')?.addValidators([Validators.required]);

    return formGroup;
  }

  createForm(model: User){
    let formGroup = this.fb.group(model);
    formGroup.get('username')?.addValidators([Validators.required]);
    formGroup.get('email')?.addValidators([Validators.required]);

    return formGroup;
  }

}
