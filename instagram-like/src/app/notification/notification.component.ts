import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
type: string = null;
message: string = null;

  constructor(private notifier: NotificationService) {
    notifier.sub.subscribe(
      data => {
        this.type = data.type,
        this.message = data.message;
      }
    );
  }

  ngOnInit() {
  }

}
