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
      this.userService.statusChange.subscribe((data) => {
       if (data) {
        const user = data;
        this.email = user.email;
        this.name = user.fullname;
        this.uid = user.uid;
       } else {
          this.fieldsReset();
       }
     });

      /**
     * We want only one listener
     */
    firebase.auth().onAuthStateChanged(userData => {
      if ( userData && userData.emailVerified ) {
        this.isLoggedIn = true;
        const data = this.userService.getProfile();
          if (data && data.fullname) {
            this.email = data.email;
            this.name = data.fullname;
            this.uid = data.uid;
        }
        this.route.navigate(['/myposts']);
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

  fieldsReset() {
    this.name = null;
    this.email = null;
    this.uid = null;
  }
}
