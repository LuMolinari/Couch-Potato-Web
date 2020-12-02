import Route from '@ember/routing/route';
import ENV from 'couch-potato-web/config/environment';
import { action } from '@ember/object'
import fetch from 'fetch'
import MovieAdapter from '../adapters/movie';

export default class SearchRoute extends Route {
  queryParams = {
    searchTerm: {
      refreshModel: true
    }
  };
    async model(params) {
      
        //set up api  
      //  var x = document.getElementById("myInput").value;  
      // // alert(params.title);
       
      // if( x === ""){
      //   x="undefined";
      // }else{
         
    //  }
        const response = await fetch('https://api.themoviedb.org/3/search/movie?api_key=4517228c3cc695f9dfa1dcb4c4979152&language=en-US&query='
        + params.searchTerm + '&page=1&include_adult=false');
        const data = await response.json();

        //return results portion of json
        return data.results;
   }





}

