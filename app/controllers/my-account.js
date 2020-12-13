import Controller from '@ember/controller';
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { set } from '@ember/object';
import { inject as service } from "@ember/service";
import firebase from "firebase/app";
import "firebase/database";
export default class MyAccountController extends Controller {

    
    @tracked isBookmark = this.args.isBookmark;
    @tracked isFavorite = this.args.isFavorite;
    @tracked title = this.args.title;
    @tracked movieID = this.args.movieID;
    // Notify works on this page for testing purposes

    @service() notify;
    //this.notify. info, success, warning, alert and error
    

    get bookmark(){
        return this.isBookmark;
    }

    get favorite(){
        return this.isFavorite;
    }
    
    @action alert(){
        console.log('b', this.isBookmark);
        console.log('f', this.isFavorite);
    }
 


    @action
    saveFavorite1() {
        //get the current userid from the firebase session.
        var user = firebase.auth().currentUser;

        //check if user is logged in
        if (user) {
            //first check if movie has been saved before
            firebase
                .database()
                .ref("users/" + user.uid + "/savedMovies/" + this.movieID)
                .once("value", (snapshot) => {
                    if (snapshot.exists()) {
                        //snapshot is returning the json for this particular movie saved by user id and putting it in userData
                        const userData = snapshot.val();
                        console.log("exists!", userData);

                        //if favorite and bookmark are both false then we must delete this movie from savedMovies
                        if (
                            userData.isFavorited === true &&
                            userData.isBookmarked === true
                        ) {
                            firebase
                                .database()
                                .ref("users/" + user.uid + "/savedMovies/" + this.movieID)
                                .update({
                                    isFavorited: !userData.isFavorited,
                                });

                            this.notify.success(this.title + " was removed from favorites.")
                           

                        }
                        else if (
                            userData.isFavorited === true && userData.isBookmarked === false
                        ) {
                            firebase
                                .database()
                                .ref("users/" + user.uid + "/savedMovies/" + this.movieID)
                                .remove();

                            this.notify.success(this.title + " was removed from favorites.")
                        }
                        else {
                            //if movie was saved then update isfavorite to be the opposite of what it is
                            firebase
                                .database()
                                .ref("users/" + user.uid + "/savedMovies/" + this.movieID)
                                .update({
                                    isFavorited: !userData.isFavorited,
                                });

                            this.notify.success(this.title + " was added to favorites.")

                        }
                    } else {
                        //otherwise create movie data in database
                        firebase
                            .database()
                            .ref("users/" + user.uid + "/savedMovies/" + this.movieID)
                            .set({
                                title: this.model.title,
                                movieID: this.model.id,
                                poster_path: this.model.poster_path,
                                vote_average: this.model.vote_average,
                                release_date: this.model.release_date,
                                isFavorited: true,
                                isBookmarked: false,
                            });

                        this.notify.success(this.title + " was added to favorites.")
                    }

                });
        } else {
            // Notify works on this page for testing purposes

            this.notify.error("You must make an account to save favorites.")
            //info, success, warning, alert and error
            //TODO provide alert asking user to sign up
            // No user is signed in.
        }
    }

    @action
    saveBookmark() {
        

        //get the current userid from the firebase session.
        var user = firebase.auth().currentUser;

        //check if user is logged in
        if (user) {
            //first check if movie has been saved before
            firebase
                .database()
                .ref("users/" + user.uid + "/savedMovies/" + this.movieID)
                .once("value", (snapshot) => {
                    if (snapshot.exists()) {
                        //snapshot is returning the json for this particular movie saved by user id and putting it in userData
                        const userData = snapshot.val();
                        console.log("exists!", userData);

                        //if favorite and bookmark are both false then we must delete this movie from savedMovies
                        if (
                            userData.isFavorited === true &&
                            userData.isBookmarked === true
                        ) {
                            firebase
                                .database()
                                .ref("users/" + user.uid + "/savedMovies/" + this.movieID)
                                .update({
                                    isBookmarked: !userData.isBookmarked,
                                });
                            this.notify.success(this.title + " was removed from bookmarks.");
                        }
                        else if (
                            userData.isFavorited === false &&
                            userData.isBookmarked === true
                        ) {
                            firebase
                                .database()
                                .ref("users/" + user.uid + "/savedMovies/" + this.movieID)
                                .remove();
                            this.notify.success(this.title + " was removed from bookmarks.")
                        } else {
                            //if movie was saved then update isBookmarked to be the opposite of what it is
                            firebase
                                .database()
                                .ref("users/" + user.uid + "/savedMovies/" + this.movieID)
                                .update({
                                    isBookmarked: !userData.isBookmarked,
                                });
                            this.notify.success(this.title + " was added to bookmarks.");
                        }
                    } else {
                        //otherwise create movie data in database
                        firebase
                            .database()
                            .ref("users/" + user.uid + "/savedMovies/" + this.movieID)
                            .set({
                                title: this.model.title,
                                movieID: this.model.id,
                                poster_path: this.model.poster_path,
                                vote_average: this.model.vote_average,
                                release_date: this.model.release_date,
                                isFavorited: false,
                                isBookmarked: true,
                            });

                        this.notify.success(this.title + " was added to Bookmarks.")

                    }

                });

            this.isBookmark = !this.isBookmark;

        } else {
            // No user is signed in.
            this.notify.error("You must make an account to save bookmarks.");
        }

    }

    @action
    async changePassword(oldPassword, newPassword) {
        
        var user = firebase.auth().currentUser;    
        var credential = await firebase.auth.EmailAuthProvider.credential(
            firebase.auth().currentUser.email,
            oldPassword
          );          
          // Prompt the user to re-provide their sign-in credentials          
          var isValid = await user.reauthenticateWithCredential(credential).then(function() {
            // User re-authenticated.
            console.log('reauthenticated');
            firebase.auth().currentUser.updatePassword(newPassword);
            console.log('changed password to ', newPassword);
            // notify user of password change success
            //this.notify.success("Password change successfull!");
            return true;
          }).catch(function(error) {
            // An error happened.
            
            
            // notify user password old password did not match current password
            console.log('old password is incorrect' + error);
            //this.notify.error("Password change failed. Incorrect old password.");
            return false;
          });           
          if(isValid){
            this.notify.info('Password change complete');  
          } else {
            this.notify.info('Password change incomplete');
          }          
    }

    @action
    async changeEmail(email, password) {
        var user = firebase.auth().currentUser;    
        var credential = await firebase.auth.EmailAuthProvider.credential(
            firebase.auth().currentUser.email,
            password
          );          
          // Prompt the user to re-provide their sign-in credentials          
          var isValid = await user.reauthenticateWithCredential(credential).then(function() {
            // User re-authenticated.
            console.log('reauthenticated');
            firebase.auth().currentUser.updateEmail(email);
            console.log('email changed to ', email);
            // notify user of password change success

            //this.notify.success("Email change successfull!");
            return true;
          }).catch(function(error) {
            // An error happened.
            // notify user password old password did not match current password
            console.log('email change failed' + error);
            //this.notify.error("Email change failed." + error);
            return false;
          });    


          if(isValid){
            this.notify.info('Email change complete');  
          } else {
            this.notify.info('Email change incomplete');
          }        
    }
}
