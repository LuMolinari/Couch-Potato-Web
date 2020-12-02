import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class SearchingService extends Service {
  @tracked search = "";

  setTerm(term) {
    this.search = term;
  }

  getTerm() {
    return this.term;
  }
}
