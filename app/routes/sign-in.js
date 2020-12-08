import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import firebase from 'firebase/app';

export default Route.extend({
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

            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                console.log("user is signed in");
                // send user to route necessary
                // change account setting to contain a logout button instead of a signin/signup
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("errors" + errorCode + errorMessage);
            });
        }
    }
});
