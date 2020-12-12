import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import firebase from "firebase/app";
import "firebase/database";

export default class NavBarComponent extends Component {
  pg = 1;
  seachQuery = "";
  @service() router;
  @service() notify;
  @service() session;
  self = this;

  @action
  openAccount() {
    var user = firebase.auth().currentUser;    
    if (user) {
      console.log("nav:logged in");      
      this.router.transitionTo("my-account");
    } else {
      this.router.transitionTo("sign-in");
      console.log("nav:not logged in");
    }
  }

  @action
  signOut() {
    console.log("logged out");
    this.session.invalidate();
  }

  @action
  openDiscover() {
    this.router.transitionTo("index", { queryParams: { page: 1 } });
  }

  @action
  openBookmarks() {
    this.router.transitionTo('bookmarks');
  }
}
