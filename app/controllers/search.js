import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class SearchController extends Controller {
  queryParams = ["searchTerm", "page", "pageCount"];

  searchTerm = "";

  //track values
  @tracked page = 1;
  @tracked pageCount = 5;

  @action nextPage() {
    if (this.page < this.pageCount) {
      this.page++;
    }
  }

  @action pastPage() {
    if (this.page > 1) {
      this.page--;
    }
  }


}
