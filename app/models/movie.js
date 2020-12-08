import Model from "@ember-data/model";
import DS from "ember-data";
import attr from "ember-data/attr";

export default class MovieModel extends Model {
  //listing attributes of the movie model
  @attr() movieID;
  @attr() title;
  @attr() poster_path;
  @attr() vote_average;
  @attr() release_date;
  @attr() isFavorited;
  @attr() isBookmarked;
}
