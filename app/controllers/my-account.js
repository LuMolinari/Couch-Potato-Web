import Controller from '@ember/controller';
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { set } from '@ember/object';
import { inject as service } from "@ember/service";
import firebase from "firebase/app";
import "firebase/database";
export default class MyAccountController extends Controller {
    @action
    changeEmail(email, password) {
        var user = firebase.auth().currentUser;    
        var credential = firebase.auth.EmailAuthProvider.credential(
            firebase.auth().currentUser.email,
            password
          );          
          // Prompt the user to re-provide their sign-in credentials          
          user.reauthenticateWithCredential(credential).then(function() {
            // User re-authenticated.
            console.log('reauthenticated');
            firebase.auth().currentUser.updateEmail(email);
            console.log('email changed to ', email);
            // notify user of password change success
            this.notify.success("Email change successfull!");
            this.notify.success(this.email + " was added to bookmarks.")
          }).catch(function(error) {
            // An error happened.
            // notify user password old password did not match current password
            console.log('email change failed');
            this.notify.error("Email change failed." + this.error);
          });      
    }

}
