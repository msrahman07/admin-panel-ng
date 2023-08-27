import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertMessage } from './alert-message.interface';

@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {
  private alertMessageSubject = new BehaviorSubject<AlertMessage | null>(null);
  alertMessage$ = this.alertMessageSubject.asObservable();

  constructor() { }

  emitAlertMessage(alertMessage: AlertMessage | null) {
    this.alertMessageSubject.next(alertMessage);
  }
}
