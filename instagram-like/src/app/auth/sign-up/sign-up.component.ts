import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    const fullName = form.value.fullname;
    const email = form.value.email;
    const password = form.value.password;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(userData => {
        //ask to verify email
        const user = firebase.auth().currentUser;
        user.sendEmailVerification();
        console.log(userData);
      })
      .catch(error=> {
        console.log(error);
      });
  }
}
