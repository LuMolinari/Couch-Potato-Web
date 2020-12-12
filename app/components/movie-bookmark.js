import Component from '@glimmer/component';
import Controller from '@ember/controller';
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { set } from '@ember/object';
import { inject as service } from "@ember/service";
import firebase from "firebase/app";
import "firebase/database";

export default class MovieBookmarkComponent extends Component {


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
                            this.notify.success(this.title + " was added to bookmarks.")
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



}
