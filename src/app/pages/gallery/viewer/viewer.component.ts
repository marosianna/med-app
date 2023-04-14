import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Appointment } from '../../../shared/models/Appointment';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Image } from '../../../shared/models/Image';
import { GalleryService } from '../../../shared/services/gallery.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, OnChanges{
  @Input() imageInput?: Image;
  loadedImage?: String;

  //appointmentObject: any = {};

  appointments: Array<any> = []; //TODO: ha Appointment-et adok meg <> között, akkor a push hibát dob (38.sor)

  appointmentsForm = this.createForm({
    username: '',
    date: new Date(),
    comment: '',
    time: {hour: 0, minute: 0}
  });


  constructor(private fb: FormBuilder, private router: Router, private galleryService: GalleryService){}


  ngOnChanges(){
    if (this.imageInput?.id){
      this.galleryService.loadImage(this.imageInput?.id + '.jpg').subscribe(data =>{
        let reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onloadend = () => {
          this.loadedImage = reader.result as string;
        }
      });
    }
  }

  ngOnInit(): void {
   
    
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
        this.router.navigateByUrl('/gallery/successful/' + this.appointmentsForm.get('username')?.value);
      }
    }
  }

}
