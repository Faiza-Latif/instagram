import * as firebase from 'firebase';

export class MyFirebaseService {

  getUserFromDatabase(uid) {
    const ref = firebase.database().ref('users/' + uid);
    return ref.once('value')
      .then(snapshot => snapshot.val());
  }

  uploadFile(file: File) {
    const ref = firebase.storage().ref().child('image/' + file.name);
    const upload = ref.put(file);

    return new Promise((resolve, reject) => {
      upload.on(firebase.storage.TaskEvent.STATE_CHANGED, {
        'next': null,
        'error': reject,
        'complete': () => {
          console.log(resolve);
          return resolve;
        }
      });
    });
  }
}
