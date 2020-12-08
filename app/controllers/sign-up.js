import Controller from '@ember/controller';
import { action } from '@ember/object'
import { inject as service } from '@ember/service';


export default class SignUpController extends Controller {
    @service session; 
}
