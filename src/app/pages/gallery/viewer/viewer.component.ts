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
        /* let reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onloadend = () => {
          this.loadedImage = reader.result as string;
        }*/
      });
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

  saveDate(){
    if(this.appointmentsForm.valid){
      if(this.appointmentsForm.get('username') && this.appointmentsForm.get('date') && this.appointmentsForm.get('comment')  && this.appointmentsForm.get('time')){
        this.appointments.push({...this.appointmentsForm.value});

        this.appointmentService.create(this.appointmentsForm.value as Appointment).then(_ =>{
         // this.router.navigateByUrl('/gallery/successful/' + this.appointmentsForm.get('username')?.value);
        }).catch(error =>{
          console.error(error);
        });
        this.appointmentService.getAppointmentByImageId(this.imageInput.id).subscribe(appointments =>{
          this.appointments = appointments;
        });
      }
    }
  }

}
