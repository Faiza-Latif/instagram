import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  name: string;
  uid: string;
  email: string;

  constructor(private userService: UserService,
    private route: Router) { }


  ngOnInit() {
    /**
     * We want only one listener
     */
    firebase.auth().onAuthStateChanged(userData => {
      if ( userData && userData.emailVerified ) {
        const user = this.userService.getProfile();

        this.email = user.email;
        this.name = user.name;
        this.uid = user.uid;
        this.isLoggedIn = true;

      } else {
        this.isLoggedIn = false;

      }
    });
  }

  logout() {
    firebase.auth().signOut()
      .then(() => {
        this.userService.destroy();
        this.isLoggedIn = false;

            });
  }

}
