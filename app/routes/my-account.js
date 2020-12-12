import Route from '@ember/routing/route';
import firebase from "firebase/app";
import "firebase/database";

export default class MyAccountRoute extends Route {
    async model(params) {
        var finalArr;
        var user = firebase.auth().currentUser;
        var movieArray = [];
        //check if user is logged in
        if (user) {
            //first check if movie has been saved before
            finalArr = await firebase
                .database()
                .ref("users/" + user.uid + "/savedMovies") // added  + "/savedMovies/"
                .once("value", (snapshot) => {
                    if (snapshot.exists()) {
                        //snapshot is returning the json for this particular movie saved by user id and putting it in userData
                        const userData = snapshot.val();
                        //console.log("exists........", userData);
                       
                        var returnArr = [];

                        snapshot.forEach(function (childSnapshot) {
                            var item = childSnapshot.val();
                            item.key = childSnapshot.key;
                            //console.log("item0 + " , item);
                            returnArr.push(item);
                        });

                        //console.log("retArr: ", returnArr);

                        // add movies to array and convert to json
                        /* var i = "";
                        for(i in returnArr){
                          //console.log(returnArr[i].title);
                            movieArray.push(returnArr[i]);
                          }
                          var movieListJson = JSON.stringify(movieArray); */


                        var myJsonString = JSON.stringify(returnArr);
                        // console.log("test", returnArr);
                        //console.log("Bookmark", returnArr[0].isBookmarked);

                        return returnArr;
                        // return movieListJson;       
                    }
                });
        }
        console.log("finalArr: ", JSON.stringify(finalArr, null, 2));
        const jsonString = JSON.stringify(finalArr);
        const jsonObjects = JSON.parse(jsonString);
        var movieObjects = [];
        var movie;

        for (movie in jsonObjects) {
            movieObjects.push(jsonObjects[movie]);
            //console.log(jsonObjects[movie].title);
        }
        //console.log("length of JSON: ", jsonObjects['454433'].title);
        //finalArr.then().catch();
        // return [{ title: 'movie'}, {title: 'movie 2'}];
        
        return movieObjects;
    }
   

}
