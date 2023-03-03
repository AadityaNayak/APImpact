import React from "react";
import ReactDOM from "react-dom/client";
import MovieCard from "./MovieCard";

function MoviesMain() {
  let [moviesList, setMoviesList] = React.useState([]);
  let [searchValue, setSearchValue] = React.useState("");

  async function getInitialList() {
    let list = [{}];
    let data = await fetch("https://www.omdbapi.com/?s=Avengers&apikey=32c0805");
    data = await data.json();
    console.log(data);
      list = await data.Search;
      setMoviesList(list);
    
  }

  function setSearchValue_func(event) {
    let val = event.target.value;
    setSearchValue(val);
  }

  async function searchMovie() {
    let list = [{}];
    let data = await fetch(
      `https://www.omdbapi.com/?s=${searchValue}&apikey=32c0805`
    );
    data = await data.json();
    console.log(data);
    if (data.Response == "True") {
      list = await data.Search;
      setMoviesList(list);
    }
  }

  async function searchMovieEnter(event) {
    if (event.key === "Enter") {
      let list = [{}];
      let data = await fetch(
        `https://www.omdbapi.com/?s=${searchValue}&apikey=32c0805`
      );
      data = await data.json();
      console.log(data);
      if (data.Response == "True") {
        list = await data.Search;
        setMoviesList(list);
      }
    }
  }

  React.useEffect(() => {
    getInitialList();
  }, []);

  function listLoader() {
    if (moviesList.length > 0) {
      let list = moviesList.map((item) => {
        return (
          <MovieCard
            key={item.imdbID}
            imdbID={item.imdbID}
            title={item.Title}
            poster={item.Poster}
            type={item.Type}
          />
        );
      });
      return list;
    } else {
      return "";
    }
  }

  return (
    <div className="movies--main">
      <h3>Search</h3>
      <div className="movies--search">
        <input
          type="text"
          placeholder="Type the name of the movie"
          value={searchValue}
          onChange={(event) => setSearchValue_func(event)}
          onKeyDown={(event) => {
            searchMovieEnter(event);
          }}
        />
        <button
          className="movie--card--favourite"
          onClick={() => {
            searchMovie();
          }}
        >
          Search
        </button>
      </div>
      <h3>Movies List</h3>
      <div className="movies--container">{listLoader()}</div>
      {/* <h3>Favourite</h3>
      <div className="movies--container"><MovieCard /></div> */}
    </div>
  );
}

export default MoviesMain;
