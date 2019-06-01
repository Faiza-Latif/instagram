import { Component, OnInit } from "@angular/core";
import { Form, NgForm } from "@angular/forms";
import * as firebase from "firebase";
import { NotificationService } from "src/app/shared/notification.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {
  constructor(private notifier: NotificationService) { }

  ngOnInit() { }

  onSubmit(form: NgForm) {
    const fullName = form.value.fullname;
    const email = form.value.email;
    const password = form.value.password;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userData => {
        // ask to verify email
        const user = userData.user;
        user.sendEmailVerification();
        const message =
          `A verification email has been sent to ${email}, kindly check your inbox and follow the steps! :) Enjoy!`;
        this.notifier.display("success", message);
        // after validating, it stays on the storage but now we need to add to a database
        // auth != database
        return firebase
          .database()
          .ref("users/" + user.uid)
          .set({
            fullname: fullName,
            email: email,
            uid: user.uid,
            registrationDate: new Date().toString()
          })
          .then(() => {
            // because its stored on storage
            firebase.auth().signOut();
          });
      })
      .catch(error => {
        this.notifier.display("error", error.message);
      });
  }
}
