import Route from "@ember/routing/route";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import firebase from "firebase/app";
import "firebase/database";

export default class MovieProfileRoute extends Route {
  
  //params.title is the movie id passed from the discover tile
  async model(params) {
    //request movie data from tmdb by id
    //i had to append to the api for movie MPAA ratings
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        params.title +
        "?api_key=4517228c3cc695f9dfa1dcb4c4979152&language=en-US&append_to_response=release_dates"
    );
    const data = await response.json();
    //return movie json
    return data;
  }

  setupController(controller, model) {
    //get the current userid from the firebase session.
    var user = firebase.auth().currentUser;

    //check if user is logged in
    if (user) {
      //first check if movie has been saved before
      firebase
        .database()
        .ref("users/" + user.uid + "/savedMovies/" + model.id)
        .once("value", (snapshot) => {
          if (snapshot.exists()) {
            //snapshot is returning the json for this particular movie saved by user id and putting it in userData
            const userData = snapshot.val();
            console.log("exists!", userData);

            console.log("Favorited: " + userData.isFavorited);
            console.log("Bookmarked: " + userData.isBookmarked);
            controller.set("model.favorite", userData.isFavorited);
            controller.set("model.bookmark", userData.isBookmarked);
          } else {
            console.log("Movie Not in Database");
          }
        });
    } else {
      controller.set("model.favorite", false);
      controller.set("model.bookmark", false);
    }

    controller.set("model", model);
  }
}
