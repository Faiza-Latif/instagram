import * as firebase from 'firebase';
import { reject } from 'q';

export class MyFirebaseService {

  getUserFromDatabase(uid) {
    const ref = firebase.database().ref('users/' + uid);
    return ref.once('value')
      .then(snapshot => snapshot.val());
  }

  uploadFile(file: File) {
    const fileName = file.name;
    const ref = firebase.storage().ref().child('image/' + fileName);
    const upload = ref.put(file);

    return new Promise((resolve, reject) => {

      upload.on('state_changed', snapshot => { },
        error => { reject(error); },
        () => {
          const fileUrl = upload.snapshot.downloadURL;
          resolve({fileName, fileUrl});
        });
    });
  }

}
