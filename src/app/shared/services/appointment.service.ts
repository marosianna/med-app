import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Appointment } from '../models/Appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

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
}
