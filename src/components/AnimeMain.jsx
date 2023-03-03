import React from "react";
import ReactDOM from "react-dom/client";
import { useParams } from "react-router-dom";
import AnimeCard from "./AnimeCard";

function AnimeMain() {
  let container;

  let [animeList, setAnimeList] = React.useState([]);
  let [searchValue, setSearchValue] = React.useState("");

  async function getInitialList() {
    let list = { status: "" };
    let data = await fetch("https://api.jikan.moe/v4/top/anime");
    data = await data.json();
    console.log(data);
    list = data;
    if (list.status !== 404) {
      setAnimeList(list.data);
    }
    console.log(list.data);
  }

  function setSearchValue_func(event) {
    let val = event.target.value;
    setSearchValue(val);
  }

  async function searchAnime() {
    let list = [{}];
    let data = await fetch(
      `https://api.jikan.moe/v4/anime?q=${searchValue}&sfw`
    );
    data = await data.json();
    console.log(data);
    list = data;
    if (list.status !== 404) {
      setAnimeList(list.data);
    }
    window.scrollBy(0, 300);
  }

  async function searchAnimeEnter(event) {
    if (event.key === "Enter") {
      let list = [{}];
      let data = await fetch(
        `https://api.jikan.moe/v4/anime?q=${searchValue}&sfw`
      );
      data = await data.json();
      list = data;
      if (list.status !== 404) {
        setAnimeList(list.data);
      }
      window.scrollBy(0, 300);
    }
  }

  function sliderFunctionality(){
    let container = document.getElementById("anime--container");
    container.addEventListener("wheel", function (e) {
      if (e.deltaY > 0) {
        container.scrollLeft += 300;
        e.preventDefault();
      } else {
        container.scrollLeft -= 300;
        e.preventDefault();
      }
    });
  }

  React.useEffect(() => {
    getInitialList();
    sliderFunctionality();
  }, []);

  function listLoader() {
    if (animeList.length > 0) {
      let list = animeList.map((item) => {
        return (
          <AnimeCard
            key={item.mal_id}
            mal_id={item.mal_id}
            title={item.title}
            image={item.images.jpg.image_url}
            season={item.season}
            year={item.year}
            type={item.type}
            genres={item.genres}
          />
        );
      });
      return list;
    } else {
      return "";
    }
  }

  return (
    <div className="anime--main">
      <h3>Search</h3>
      <div className="movies--search">
        <input
          type="text"
          placeholder="Type the name of the movie"
          value={searchValue}
          onChange={(event) => setSearchValue_func(event)}
          onKeyDown={(event) => {
            searchAnimeEnter(event);
          }}
        />
        <button
          className="movie--card--favourite"
          onClick={() => {
            searchAnime();
          }}
        >
          Search
        </button>
      </div>
      <h3>Anime List</h3>
      <div className="anime--container" id="anime--container">
        {listLoader()}
      </div>
    </div>
  );
}

export default AnimeMain;
