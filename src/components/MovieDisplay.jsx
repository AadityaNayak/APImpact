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
    Ratings: [
      { Source: "", Value: "" },
      { Source: "", Value: "" },
      { Source: "", Value: "" },
    ],
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
    Plot:""
  });

  async function getMovie() {
    let data_ = {};
    let data = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=32c0805`);
    data = await data.json();
    if (data.Response == "True") {
      setMovieData((prevMovieData) => {
        return { ...prevMovieData, ...data };
      });
    }
  }

  function displayRatings() {
    let data = [];
    let count = 0;
    if (movieData.Ratings.length > 0) {
      data = movieData.Ratings.map((element) => {
        return (
          <div key={count++}>
            {element.Source}: {element.Value}
          </div>
        );
      });
    }
    return data;
  }

  React.useEffect(() => {
    getMovie();
  }, []);

  return (
    <div className="movie--display">
      <div className="movie--display--left">
        <div className="movie--display--title">
          <h2>
            {movieData.Title} - {movieData.Year}
          </h2>
          <p>{movieData.Type}</p>
        </div>
        <hr style={{ width: "100%" }} />
        <div
          className="movie--display--poster"
          style={{ backgroundImage: `url(${movieData.Poster})` }}
        ></div>
        <div className="movie--display--ratings">
          <h4>Stats</h4>
          {displayRatings()}
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
      <hr style={{ width: "100%" }} />
      <div className="movie--display--synopsis">
        <h4>Plot</h4>
        <p>{movieData.Plot}</p>
      </div>
      <hr style={{ width: "100%" }} />
    </div>
  );
}

export default MovieDisplay;
