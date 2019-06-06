import { UserService } from './user.service';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyFirebaseService {

  constructor(private user: UserService) { }

  getUserFromDatabase(uid) {
    const ref = firebase.database().ref('users/' + uid);
    return ref.once('value')
      .then(snapshot => snapshot.val());
  }

  uploadFile(file: File) {
    const fileName = this.generateFileName(5);
    console.log(fileName);
    const ref = firebase.storage().ref().child('image/' + fileName);
    const upload = ref.put(file);
    let fileUrl = '';
    return new Promise((resolve, reject) => {

      upload.on('state_changed', next => { },
        error => { reject(error); },
        () => {
          const urlUpload = upload.snapshot.ref.getDownloadURL()
            .then(downloadUrl => {
              fileUrl = downloadUrl;
              resolve({ fileName, fileUrl });
            });

        });
    });
  }

  handleImageUpload(data) {
    const user = this.user.getProfile();
    const myPost = firebase.database().ref().child('myposts').push().key;
    const allPost = firebase.database().ref().child('allposts').push().key;
    const mydetails = {
      fileUrl: data.fileUrl,
      name: data.fileName,
      creationDate: new Date().toString()
    };
    const alldetails = {
      fileUrl: data.fileUrl,
      name: data.fileName,
      creationDate: new Date().toString(),
      uploadedBy: user
    };
    const image = {
      fileUrl: data.fileUrl,
      name: data.fileName,
      creationDate: new Date().toString(),
      uploadedBy: user,
      favoriteCount: 0
    };
    console.log(mydetails);
    const updates = {};
    updates['/myposts/' + user.uid + '/' + myPost] = mydetails;
    updates['/allposts/' + allPost] = alldetails;
    updates['/images/' + data.fileName] = image;


    return firebase.database().ref().update(updates);
  }

  generateFileName(length) {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      console.log(result);
      return result;
  }

  getUserReference(uid) {
    return firebase.database().ref('myPosts').child(uid);
  }

}
