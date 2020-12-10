import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import firebase from "firebase/app";

export default class NavBarComponent extends Component {
  pg=1;
  seachQuery = "";
  @service() router;
  self = this;

  @action 
  openAccount(){
    var user = firebase.auth().currentUser;

    if(user){
     console.log("logged in");
    } else{
      console.log("not logged in");

    }
  }
}
