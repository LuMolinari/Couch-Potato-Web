import Route from '@ember/routing/route';
import fetch from 'fetch'
export default class IndexRoute extends Route {
    async model() {
        //set up api
        const response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=4517228c3cc695f9dfa1dcb4c4979152&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1');
        const data = await response.json();

        //return results portion of json
        return data.results;
    }



   // model(){
        //this is where the javascript goes
        //https://api.themoviedb.org/3/discover/movie?api_key=4517228c3cc695f9dfa1dcb4c4979152&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1
       
        
       
        // const imageUrl = 'http://image.tmdb.org/t/p/w185';

        // fetch('https://api.themoviedb.org/3/discover/movie?api_key=4517228c3cc695f9dfa1dcb4c4979152&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')
        // .then(response => {
        // return response.json();
        // })
        // .then(data =>{
        //     document.querySelector(".movie-container").innerHTML = JSON.stringify(data);
             
        //     for(var i =0; i<data.results.length ;i++){

        //         this.store.createRecord('movie',{
        //             movieIDid: data.results[i].id,
        //             title: data.results[i].title,
        //             poster_path: imageUrl + data.results[i].poster_path,
        //             backdrop_path: imageUrl + data.results[i].backdrop_path,
        //             vote_average:data.results[i].vote_average,
        //             overview:data.results[i].overview,
        //             release_date:data.results[i].release_date
        //          })
               
        //         console.log( data.results[i].id);
        //         console.log(data.results[i].title);
        //         console.log( imageUrl + data.results[i].poster_path);
        //         console.log(data.results[i].backdrop_path);
        //         console.log(data.results[i].vote_average);
        //         console.log(data.results[i].overview);
        //         console.log(data.results[i].release_date);

             
        //     }
        // })

       
    
  //  }

 
}
