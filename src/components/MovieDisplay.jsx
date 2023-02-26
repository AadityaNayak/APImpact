import React from "react";
import ReactDOM from "react-dom/client";
import { useParams } from "react-router-dom";

function MovieDisplay() {
  let { id } = useParams();
  let [movieData, setMovieData] = React.useState({
    Title: "",
    Year: "",
    Released: "",
    Poster: "",
    Ratings: [{Source:"",Value:""},{Source:"",Value:""}, {Source:"",Value:""}],
    BoxOffice: "",
    Awards: "",
    Genre: "",
    Runtime: "",
    Language: "",
    Country: "",
    Director: "",
    Writer: "",
    Actors: "",
    Type: "",
  });

  async function getMovie() {
    let data = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=32c0805`);
    data = await data.json();
    if (data.Response == "True") {
      setMovieData(data);
    }
  }

  React.useEffect(() => {
    getMovie();
  }, []);

  return (
    <div className="movie--display">
      <div className="movie--display--left">
        <div className="movie--display--title">
          <h2>({movieData.Type}) {movieData.Title} - {movieData.Year}</h2>
        </div>
        <div className="movie--display--poster" style={{backgroundImage:`url(${movieData.Poster})`}}></div>
        <div className="movie--display--ratings">
          <div>IMDB: {movieData.Ratings[0].Value}</div>
          <div>Rotten Tomatoes: {movieData.Ratings[1].Value}</div>
          <div>Metacritic: {movieData.Ratings[2].Value}</div>
          <hr />
          <div>Box office collection: {movieData.BoxOffice}</div>
          <hr />
          <div>Awards: {movieData.Awards}</div>
        </div>
      </div>
      <div className="movie--display--right">
        <div>Release Date: {movieData.Released}</div>
        
        <div>Genre: {movieData.Genre}</div>
        
        <div>Runtime: {movieData.Runtime}</div>
        
        <div>Language: {movieData.Language}</div>
        
        <div>Country: {movieData.Country}</div>
        
        <div>Director: {movieData.Director}</div>
        
        <div>Writer: {movieData.Writer}</div>
        
        <div>Actors: {movieData.Actors}</div>
      </div>
    </div>
  );
}

export default MovieDisplay;