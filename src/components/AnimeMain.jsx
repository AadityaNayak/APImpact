import React from "react";
import ReactDOM from "react-dom/client";
import { useParams } from "react-router-dom";
import AnimeCard from "./AnimeCard";

function AnimeMain() {
  let container;

  const [animeList, setAnimeList] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [mangaList, setMangaList] = React.useState([]);

  async function getInitialList() {
    let data_ = [];
    let data1_ = [];
    let data = await fetch("https://api.jikan.moe/v4/top/anime");
    let data1 = await fetch("https://api.jikan.moe/v4/top/manga");
    data_ = await data.json();
    data1_ = await data1.json();
    if (data.status === 200) {
      setAnimeList(data_.data);
    }
    if (data1.status === 200) {
      setMangaList(data1_.data);
    }
  }

  function setSearchValue_func(event) {
    let val = event.target.value;
    setSearchValue(val);
  }

  async function searchAnime() {
    let data_ = [];
    let data1_ = [];

    let data = await fetch(
      `https://api.jikan.moe/v4/anime?q=${searchValue}&sfw`
    );
    let data1 = await fetch(
      `https://api.jikan.moe/v4/manga?q=${searchValue}&sfw`
    );
    data_ = await data.json();
    data1_ = await data1.json();
    if (data.status === 200) {
      setAnimeList(data_.data);
    }
    if (data1.status === 200) {
      setMangaList(data1_.data);
    }
    window.scrollBy(0, 300);
  }

  async function searchAnimeEnter(event) {
    if (event.key === "Enter") {
      let data_ = [];
      let data1_ = [];

      let data = await fetch(
        `https://api.jikan.moe/v4/anime?q=${searchValue}&sfw`
      );
      let data1 = await fetch(
        `https://api.jikan.moe/v4/manga?q=${searchValue}&sfw`
      );
      data_ = await data.json();
      data1_ = await data1.json();

      if (data.status === 200) {
        setAnimeList(data_.data);
      }
      if (data1.status === 200) {
        setMangaList(data1_.data);
      }
      window.scrollBy(0, 300);
    }
  }

  function sliderFunctionality() {
    let anime_container = document.getElementById("anime--container");
    let manga_container = document.getElementById("manga--container");
    anime_container.addEventListener("wheel", function (e) {
      if (e.deltaY > 0) {
        anime_container.scrollLeft += 300;
        e.preventDefault();
      } else {
        anime_container.scrollLeft -= 300;
        e.preventDefault();
      }
    });
    manga_container.addEventListener("wheel", function (e) {
      if (e.deltaY > 0) {
        manga_container.scrollLeft += 300;
        e.preventDefault();
      } else {
        manga_container.scrollLeft -= 300;
        e.preventDefault();
      }
    });
  }

  React.useEffect(() => {
    getInitialList();
    sliderFunctionality();
  }, []);

  function animeListLoader() {
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
            switch_command={"anime"}
          />
        );
      });
      return list;
    } else {
      return "";
    }
  }
  function mangaListLoader() {
    if (mangaList.length > 0) {
      let list = mangaList.map((item) => {
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
            switch_command={"manga"}
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

      {/* Anime */}

      <h3>Anime</h3>
      <div className="anime--container" id="anime--container">
        {animeListLoader()}
      </div>

      {/* Manga */}
      <h3>Manga</h3>
      <div className="anime--container manga--container" id="manga--container">
        {mangaListLoader()}
      </div>
    </div>
  );
}

export default AnimeMain;
