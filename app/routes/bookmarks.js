import Route from '@ember/routing/route';

export default class BookmarksRoute extends Route {
    async model(params) {
        //set up api
        const response = await fetch(
          "https://api.themoviedb.org/3/discover/movie?api_key=4517228c3cc695f9dfa1dcb4c4979152&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"        );
        const data = await response.json();
    
        //return results portion of json
        return data.results;
      }
}
