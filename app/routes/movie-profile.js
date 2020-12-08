import Route from "@ember/routing/route";

export default class MovieProfileRoute extends Route {
  //params.title is the movie id passed from the discover tile
  async model(params) {
    //request movie data from tmdb by id
    //i had to append to the api for movie MPAA ratings
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        params.title +
        "?api_key=4517228c3cc695f9dfa1dcb4c4979152&language=en-US&append_to_response=release_dates"
    );
    const data = await response.json();
    //return movie json
    return data;
  }
}
