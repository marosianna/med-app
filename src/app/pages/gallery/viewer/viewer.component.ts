import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from '../../../shared/models/Appointment';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit{
  @Input() imageInput: any;

  //appointmentObject: any = {};

  appointments: Array<any> = []; //TODO: ha Appointment-et adok meg <> között, akkor a push hibát dob (38.sor)

  appointmentsForm = this.createForm({
    username: '',
    date: new Date(),
    comment: ''
  });


  constructor(private fb: FormBuilder, private router: Router){}

  ngOnInit(): void {
    
  }

  createForm(model: Appointment){
    let formGroup = this.fb.group(model);
    formGroup.get('username')?.addValidators([Validators.required]);
    formGroup.get('date')?.addValidators([Validators.required]);
    formGroup.get('comment')?.addValidators([Validators.required, Validators.minLength(20)]);

    return formGroup;
  }

  saveDate(){
    if(this.appointmentsForm.valid){
      if(this.appointmentsForm.get('username') && this.appointmentsForm.get('date') && this.appointmentsForm.get('comment')){
        this.appointments.push({...this.appointmentsForm.value});
        this.router.navigateByUrl('/gallery/successful/' + this.appointmentsForm.get('username')?.value);
      }
    }
  }

}
