import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  /**
   * A subject is used when you want to watch and be watched
   */
  public sub = new Subject<any>();

  display(type, message) {
    this.sub.next({type, message});
  }
  constructor() { }
}
