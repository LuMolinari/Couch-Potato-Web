import Route from '@ember/routing/route';
import firebase from "firebase/app";
import "firebase/database";

export default class BookmarksRoute extends Route {



  async model(params) {
    var user = firebase.auth().currentUser;

    //check if user is logged in
    if (user) {
      //first check if movie has been saved before
      firebase
        .database()
        .ref("users/" + user.uid )
        .once("value", (snapshot) => {
          if (snapshot.exists()) {
            //snapshot is returning the json for this particular movie saved by user id and putting it in userData
            const userData = snapshot.val();
            console.log("exists........", userData);
           
              var returnArr = [];
          
              snapshot.forEach(function(childSnapshot) {
                  var item = childSnapshot.val();
                  item.key = childSnapshot.key;
          
                  returnArr.push(item);
              });
              var myJsonString = JSON.stringify(returnArr);

              console.log("test", myJsonString);
              return myJsonString;
          
            
          }
        });
      }
    }

  }


    
  
