import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Appointment } from '../models/Appointment';
import { Observable } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';
import { user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  appointments: Array<any> = []; 

  collectionName = 'Appointments';

  constructor(private afs: AngularFirestore) { }

  create(appointment: Appointment){
    appointment.id = this.afs.createId();
    return this.afs.collection<Appointment>(this.collectionName).doc(appointment.id).set(appointment);

  }

  getAll(){
    return this.afs.collection<Appointment>(this.collectionName).valueChanges();
  }

  update(appointment: Appointment){
    return this.afs.collection<Appointment>(this.collectionName).doc(appointment.id).set(appointment);
  }

  delete(id: string){
    return this.afs.collection<Appointment>(this.collectionName).doc(id).delete();
  }

  getAppointmentByImageId(imageId: string){
    return this.afs.collection<Appointment>(this.collectionName, ref => ref.where('imageId', '==', imageId).orderBy('date', 'asc')).valueChanges();
  }

  getAppointmentById(id: string){
    return this.afs.collection<Appointment>(this.collectionName, ref => ref.where('id', '==', id)).valueChanges();
  }

/*  getAppointmentsByImageIdAndDate(imageId: string, date: Date): Observable<Appointment[]> {
    return this.afs.collection<Appointment>('appointments', ref => ref
      .where('imageId', '==', imageId)
      .where('date', '==', Timestamp.fromDate(date))
    ).valueChanges();
  }*/

  getAppointmentsByUsername(username?: string){
    return this.afs.collection<Appointment>(this.collectionName,  ref => ref.where('username', '==', username)).valueChanges();
}
}