import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class SearchController extends Controller {
    queryParams = ['searchTerm'];

    searchTerm = "";
    // @service('searching') search;



}
