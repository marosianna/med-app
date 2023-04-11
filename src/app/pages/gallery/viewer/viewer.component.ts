import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit{
  @Input() imageInput: any;
  appointmentObject: any = {};

  appointments: Array<any> = [];


  constructor(){}

  ngOnInit(): void {
    
  }
  saveDate(){
    if(this.appointmentObject.username && this.appointmentObject.date){
      this.appointments.push(Object.assign({}, this.appointmentObject));
    }
  }

}
