import { Component, OnInit } from '@angular/core';
import { MyFirebaseService } from 'src/app/shared/firebase.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {
  constructor(
    private fireService: MyFirebaseService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

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
        })
        .catch(err => {
          this.notificationService.display('error', err);
        });
    }
  }
}
