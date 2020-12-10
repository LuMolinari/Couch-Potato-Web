import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {
  // Notify works on this page for testing purposes
  @service() notify;
  //this.notify. info, success, warning, alert and error
  
  //create query paramaters
  queryParams = ["page", "size"];

  //track values
  @tracked page = 1;
  size = 1000;

  @action nextPage() {
   
    if (this.page < this.size) {
      this.page++;
    }
  }

  @action pastPage() {
    if (this.page > 1) {
      this.page--;
    }
  }
}
