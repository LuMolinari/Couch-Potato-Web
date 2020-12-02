import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class IndexController extends Controller {
  //create query paramaters
  queryParams = ["page", "size"];

  //track values
  @tracked page = 1;
  size = 1000;

  @action nextPage() {
    if (this.page < this.size) {
      this.page++;
    }
    return this.set("page-number", this.page.toString);
  }

  @action pastPage() {
    if (this.page > 1) {
      this.page--;
    }
  }
}
