import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeLoadingService {

  constructor() { }

  loadingWithPromise(email: any, password: any): Promise<boolean>{ //csak az any-vel nem dob hibát...
    return new Promise((resolve, reject) => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if(i === 3){
        clearInterval(interval);
          if (email === 'test@gmail.com' && password === 'testpw'){
            resolve(true);
          } else {
            reject(false);
          }
      }
    }, 1000)
  });
  }

  loadingWithObservable(email: any, password: any): Observable<boolean>{
    return new Observable((subscriber: Subscriber<boolean>)=>{
      let i = 0;
      const interval = setInterval(() =>{
        i++;
        if(i === 3){
          if (email === 'test@gmail.com' && password === 'testpw'){
            subscriber.next(true);
            subscriber.complete();
          } else {
            subscriber.error(false);
          }
        }
      }, 1000)
    });
  }
}
