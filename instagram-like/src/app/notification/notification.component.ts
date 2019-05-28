import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
type: string = null;
message: string = 'test';

  constructor() { }

  ngOnInit() {
  }

}
