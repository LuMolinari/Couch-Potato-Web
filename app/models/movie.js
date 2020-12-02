import Model from "@ember-data/model";
import DS from "ember-data";
import attr from "ember-data/attr";

export default class MovieModel extends Model {
  //listing attributes of the movie model
  @attr() movieID;
  @attr() title;
  @attr() poster_path;
  @attr() backdrop_path;
  @attr() vote_average;
  @attr() overview;
  @attr() release_date;

  // title: DS.attr('string'),
  // img: DS.attr('string'),
  // img2: DS.attr('string'),
  // reviewScore: DS.attr('string'),
  // description: DS.attr('string'),
}
