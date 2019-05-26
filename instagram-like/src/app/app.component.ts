import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'instagram-like';

  ngOnInit() {
    const firebaseConfig = {
      apiKey: 'AIzaSyCvk7uYtDpQOEuHPXb8UfLYc2uSQrcV8Kw',
      authDomain: 'instagram-be6fc.firebaseapp.com',
      databaseURL: 'https://instagram-be6fc.firebaseio.com',
      projectId: 'instagram-be6fc',
      storageBucket: 'instagram-be6fc.appspot.com',
      messagingSenderId: '954055132279',
      appId: '1:954055132279:web:dc4686c75fabdec0'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
