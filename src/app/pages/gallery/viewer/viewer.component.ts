import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Appointment } from '../../../shared/models/Appointment';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Image } from '../../../shared/models/Image';
import { GalleryService } from '../../../shared/services/gallery.service';
import { AppointmentService } from '../../../shared/services/appointment.service';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/User';


@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, OnChanges{
  @Input() imageInput?: any; // Image-nek kellene lennie, de akkor hibákat dob
  loadedImage?: string;
  user?: User;
  id? : string;

  //appointmentObject: any = {};

  appointments: Array<any> = []; //TODO: ha Appointment-et adok meg <> között, akkor a push hibát dob (38.sor)

  appointmentsForm = this.createForm({
    id: '',
    username: '',
    date: 0,
    comment: '',
    time: '',
    imageId: this.imageInput?.id
  });


  constructor(
    private fb: FormBuilder,
    private router: Router, 
    private galleryService: GalleryService, 
    private appointmentService: AppointmentService,
    private userService: UserService){}

    

  ngOnChanges(){
    if (this.imageInput?.id){
      this.appointmentsForm.get('imageId')?.setValue(this.imageInput.id);
      this.galleryService.loadImage(this.imageInput.image_url).subscribe(data =>{
       this.loadedImage = data;
      });
      if(this.user?.username){
      this.appointmentService.getAppointmentsByUsernameAndId(this.user.username, this.imageInput.id).subscribe(appointments =>{
        this.appointments = appointments;
      });
    }
    }else{
      this.appointments = [];
    }
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(data =>{
      this.user = data;
      this.appointmentsForm.get('username')?.setValue(this.user?.username);
    }, error =>{
      console.error(error);
    });
  }

  createForm(model: Appointment){
    let formGroup = this.fb.group(model);
    formGroup.get('username')?.addValidators([Validators.required]);
    formGroup.get('date')?.addValidators([Validators.required]);
    formGroup.get('comment')?.addValidators([Validators.required, Validators.minLength(20)]);
    formGroup.get('time')?.addValidators([Validators.required]);
    return formGroup;
  }

  createDate(){
    if(this.appointmentsForm.valid){
      if(this.appointmentsForm.get('username') && this.appointmentsForm.get('date') && this.appointmentsForm.get('comment')  && this.appointmentsForm.get('time')){
        this.appointments.push({...this.appointmentsForm.value});

        this.appointmentService.create(this.appointmentsForm.value as Appointment).then(_ =>{
        }).catch(error =>{
          console.error(error);
        });
        this.appointmentService.getAppointmentsByUsernameAndId(this.user?.username, this.imageInput.id).subscribe(appointments =>{
          this.appointments = appointments;
        });
      }
    }
  }

  updateAppointment(){
    const appointment = this.appointmentsForm.value as Appointment;
    this.appointmentService.update(appointment)
    .then(() => {
      console.log(`Appointment with id ${appointment.id} has been updated`);
      this.appointments = this.appointments.map(item => item.id === appointment.id ? appointment : item);
      this.appointmentsForm.reset();
    })
    .catch(error => {
      console.error(`Error updating appointment with id ${appointment.id}:`, error);
    });
 
  }

  saveDate(){
    const id = this.appointmentsForm.get('id')?.value;
    const existingAppointment = this.appointments.find((appointment) => appointment.id === id);

    if (existingAppointment) {
      this.updateAppointment();
    }else{
      this.createDate();
    }
    const appointmentId = this.appointmentsForm.get('id')?.value;
    this.getAppointment(appointmentId as string);
  }

  getAppointment(id: string) {
    this.appointmentService.getAppointmentById(id).subscribe((appointments) => {
        console.log(`Appointment with id ${id} has been loaded`);
        const appointment = appointments[0];
        
    this.appointmentsForm.patchValue({
      id: appointment?.id,
      username: appointment?.username,
      date: appointment?.date,
      time: appointment?.time,
      comment: appointment?.comment,
      imageId: this.imageInput?.id
    });
      });
  }

  deleteAppointment() {
    const id = this.id as string; 
    this.appointmentService.delete(id)
      .then(() => {
        console.log(`Appointment with id ${id} has been deleted`);
        this.appointments = this.appointments.filter(appointment => appointment.id !== id);
      })
      .catch(error => {
        console.error(`Error deleting appointment with id ${id}:`, error);
      });
  }
}