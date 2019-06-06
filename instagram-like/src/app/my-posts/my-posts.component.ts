import { Component, OnInit } from '@angular/core';
import { MyFirebaseService } from 'src/app/shared/firebase.service';
import { NotificationService } from 'src/app/shared/notification.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {
  postList: any = [];
  myPostsRef: any;

  constructor(
    private fireService: MyFirebaseService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    const uid = firebase.auth().currentUser.uid;
    this.myPostsRef = this.fireService.getUserReference(uid);
    this.myPostsRef.on('child_added', (data) => {
      console.log(data);
    this.postList.push({
      key: data.key,
      data: data.val()
    });
  });
  console.log(this.postList);

  }

  onFileSelection(event) {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.fireService
        .uploadFile(file)
        .then(data => {
          this.notificationService.display(
            'success',
            'Picture successfully uploaded'
          );
          this.fireService.handleImageUpload(data);
        })
        .catch(err => {
          this.notificationService.display('error', err);
        });
    }
  }




}
