import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import firebase from "firebase/app";
import "firebase/database";

export default class MovieProfileController extends Controller {
 
  @tracked checkBookmark = false;
  @tracked checkfavorite = false;
  //the model data passesd is available in the controller using this.model
  //check the route to see how it's passed

  @action
  saveFavorite() {
    console.log(this.checkBookmark);
    console.log(this.checkfavorite);
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
            } else {
              //if movie was saved then update isfavorite to be the opposite of what it is
              firebase
                .database()
                .ref("users/" + user.uid + "/savedMovies/" + this.model.id)
                .update({
                  isFavorited: !userData.isFavorited,
                });
                this.checkfavorite = !userData.isFavorited;
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
          }

          window.location.reload(true);
        });

      
    } else {
      console.log("User Not Signed in");
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
            } else {
              //if movie was saved then update isBookmarked to be the opposite of what it is
              firebase
                .database()
                .ref("users/" + user.uid + "/savedMovies/" + this.model.id)
                .update({
                  isBookmarked: !userData.isBookmarked,
                });
                this.checkBookmark=!userData.isBookmarked;
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
          }

          window.location.reload(true);
        });
        
    } else {
      console.log("User Not Signed in");
      //TODO provide alert asking user to sign up
      // No user is signed in.
    }

  }


}
