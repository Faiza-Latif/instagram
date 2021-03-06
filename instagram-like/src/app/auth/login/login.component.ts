import { UserService } from 'src/app/shared/user.service';
import { MyFirebaseService } from 'src/app/shared/firebase.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { NotificationService } from 'src/app/shared/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private notificationService: NotificationService,
    private firebaseService: MyFirebaseService,
    private userService: UserService,
    public route: Router) { }

  ngOnInit() {
  }

/**
 *
 * Validates if user is in the database
 */
onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userData) => {
      if (!userData.user.emailVerified) {
        this.notificationService.display('error', 'Your email has not yet been verified');
        firebase.auth().signOut();
      } else {
        //lets see if the user is in the database
        return this.firebaseService.getUserFromDatabase(userData.user.uid);
      }
    })
  .then((userFromDatabase) => {
      if (userFromDatabase) {
      this.userService.set(userFromDatabase);
  }
})
    .catch((error) => {
        this.notificationService.display('error', error.message);
      });
    }

}
