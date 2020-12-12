import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import firebase from "firebase/app";
import "firebase/database";

export default class MovieProfileController extends Controller {
 // Notify works on this page for testing purposes
  @service() notify;
 //this.notify. info, success, warning, alert and error
  @tracked checkBookmark = false;
  @tracked checkfavorite = false;
  //the model data passesd is available in the controller using this.model
  //check the route to see how it's passed


  get favorite() {
    return this.checkfavorite;
  }
  get bookmark(){
    return this.checkBookmark;
  }

  @action
  saveFavorite() {
    //get the current userid from the firebase session.
    var user = firebase.auth().currentUser;

    //check if user is logged in
    if (user) {
      //first check if movie has been saved before
      firebase
        .database()
        .ref("users/" + user.uid + "/savedMovies/" + this.model.id)
        .once("value", (snapshot) => {
          if (snapshot.exists()) {
            //snapshot is returning the json for this particular movie saved by user id and putting it in userData
            const userData = snapshot.val();
            console.log("exists!", userData);

            //if favorite and bookmark are both false then we must delete this movie from savedMovies
            if (
              userData.isFavorited === true &&
              userData.isBookmarked === false
            ) {
              firebase
                .database()
                .ref("users/" + user.uid + "/savedMovies/" + this.model.id)
                .remove();
                this.notify.success(this.model.title + " was removed from favorites.")

            } else {
              //if movie was saved then update isfavorite to be the opposite of what it is
              firebase
                .database()
                .ref("users/" + user.uid + "/savedMovies/" + this.model.id)
                .update({
                  isFavorited: !userData.isFavorited,
                });

                this.notify.success(this.model.title + " was added to favorites.")

            }
          } else {
            //otherwise create movie data in database
            firebase
              .database()
              .ref("users/" + user.uid + "/savedMovies/" + this.model.id)
              .set({
                title: this.model.title,
                movieID: this.model.id,
                poster_path: this.model.poster_path,
                vote_average: this.model.vote_average,
                release_date: this.model.release_date,
                isFavorited: true,
                isBookmarked: false,
              });

              this.notify.success(this.model.title + " was added to favorites.")
          }

        });

        this.checkfavorite = !this.checkfavorite;

      
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
        .ref("users/" + user.uid + "/savedMovies/" + this.model.id)
        .once("value", (snapshot) => {
          if (snapshot.exists()) {
            //snapshot is returning the json for this particular movie saved by user id and putting it in userData
            const userData = snapshot.val();
            console.log("exists!", userData);

            //if favorite and bookmark are both false then we must delete this movie from savedMovies
            if (
              userData.isFavorited === false &&
              userData.isBookmarked === true
            ) {
              firebase
                .database()
                .ref("users/" + user.uid + "/savedMovies/" + this.model.id)
                .remove();
                this.notify.success(this.model.title + " was removed from bookmarks.")
            } else {
              //if movie was saved then update isBookmarked to be the opposite of what it is
              firebase
                .database()
                .ref("users/" + user.uid + "/savedMovies/" + this.model.id)
                .update({
                  isBookmarked: !userData.isBookmarked,
                });
                this.notify.success(this.model.title + " was added to bookmarks.")

            }
          } else {
            //otherwise create movie data in database
            firebase
              .database()
              .ref("users/" + user.uid + "/savedMovies/" + this.model.id)
              .set({
                title: this.model.title,
                movieID: this.model.id,
                poster_path: this.model.poster_path,
                vote_average: this.model.vote_average,
                release_date: this.model.release_date,
                isFavorited: false,
                isBookmarked: true,
              });

              this.notify.success(this.model.title + " was added to Bookmarks.")

          }

        });

        this.checkBookmark=!this.checkBookmark;

    } else {      
      // No user is signed in.
      this.notify.error("You must make an account to save bookmarks.");
    }

  }


}
