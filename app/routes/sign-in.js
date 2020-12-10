
// import Route from "@ember/routing/route";
// import ember from "ember";

// export default class SignInRoute extends Route {
    
// }
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import firebase from 'firebase/app';
import "firebase/database";

export default Route.extend({
    notify: service(),
    session: service(),
    firebaseApp: service(),
    
    actions: {
        logout() {
            logout
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
            }).catch(function(error) {
                // An error happened.
            });              
            return this.get('session').invalidate();
        },
        async login() {
            const auth = await this.get('firebaseApp').auth();
            const {email, password} = this.get('controller').getProperties('email', 'password');

            firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                console.log("user is signed in");
                // send user to route necessary
                // change account setting to contain a logout button instead of a signin/signup
                this.notify.success("Sign In Successful");
                this.transitionTo('index');
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("errors " + errorCode + ' '+ errorMessage);
                this.notify.error(errorMessage);
            });
        }
    }
});

