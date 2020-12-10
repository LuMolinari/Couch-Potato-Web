// import Route from '@ember/routing/route';

// export default class SignUpRoute extends Route {
// }

import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import firebase from 'firebase/app';

export default Route.extend({
    notify: service(),
    session: service(),
    firebaseApp: service(),
    actions: {
        async signUp() {
            const auth = await this.get('firebaseApp').auth();

            /* if we want to use google sign in instead */
            // const provider = new firebase.auth.GoogleAuthProvider();
            // return auth.signInWithPopup(provider);

            const {first, last, email, password} = this.get('controller').getProperties('first', 'last', 'email', 'password');

            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                console.log("user is signed up");
                var currUser = firebase.auth().currentUser;

                currUser.updateProfile({
                    First: first,
                    Last: last
                  }).then(function() {
                    // Update successful.
                  }).catch(function(error) {
                    // An error happened.
                  });
                  

                //create alert
                this.notify.success("Account Created")
                // send user to route necessary
                this.transitionTo('index')
                // change account setting to contain a logout button instead of a signin/signup
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("errors :" + errorCode +" "+ errorMessage);
                this.notify.error(errorMessage);
            });
        }
    }
});
