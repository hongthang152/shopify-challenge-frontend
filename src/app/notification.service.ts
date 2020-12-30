import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert, AlertType } from 'src/models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private subject = new Subject<Alert>();

  constructor() { }

  success(msg: string) {
    this.subject.next(new Alert(msg, AlertType.Success));
    this.close();
  }

  error(msg: string) {
    this.subject.next(new Alert(msg, AlertType.Error));
    this.close();
  }

  info(msg: string) {
    this.subject.next(new Alert(msg, AlertType.Info));
    this.close();
  }

  onAlert(): Observable<Alert> {
    return this.subject.asObservable();
  }

  close(timeout = 5000) {
    setTimeout(() => {
     this.subject.next(new Alert(null, AlertType.Close))
    }, timeout);
  }
}
