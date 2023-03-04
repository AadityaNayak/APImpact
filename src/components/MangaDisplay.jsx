import React from "react";
import ReactDOM from "react-dom/client";
import { useParams } from "react-router-dom";

function MangaDisplay() {
  let { id } = useParams();
  let [mangaData, setMangaData] = React.useState({
    mal_id: 0,
    url: "string",
    images: { jpg: [{ large_image_url: "" }] },
    trailer: {
      url: "",
      embed_url: "",
      youtube_id: "",
    },
    approved: true,
    titles: [],
    title: "string",
    title_english: "string",
    title_japanese: "string",
    title_synonyms: [],
    type: "TV",
    source: "string",
    episodes: 0,
    status: "Finished Airing",
    rating: "G - All Ages",
    score: 0,
    scored_by: 0,
    rank: 0,
    popularity: 0,
    members: 0,
    favorites: 0,
    synopsis: "string",
    background: "string",
    season: "",
    year: null,
    genres: [],
    explicit_genres: [],
    themes: [],
    demographics: [],
    relations: [],
    theme: {},
    external: [],
    authors:[],
    serializations:[],
  });

  async function getManga() {
    let data = await fetch(`https://api.jikan.moe/v4/manga/${id}/full`);
    data = await data.json();
    data = data.data;
    setMangaData((prevmangaData) => {
      return { ...prevmangaData, ...data };
    });
  }

  function genreLoader() {
    let genres = mangaData.genres.map((item) => {
      return item.name + ", ";
    });
    return genres;
  }
  function authorsLoader() {
    let studios = mangaData.authors.map((item) => {
      return item.name + ", ";
    });
    return studios;
  }
  function serializationsLoader() {
    let producers = mangaData.serializations.map((item) => {
      return item.name + ", ";
    });
    return producers;
  }

  React.useEffect(() => {
    getManga();
  }, []);

  return (
    <div className="anime--display">
      <div className="anime--display--left">
        <div className="anime--display--title">
          <h2>
            {mangaData.title} ({mangaData.type})
          </h2>
          <p>
            {mangaData.season} -- {mangaData.year}
          </p>
        </div>
        <hr />
        <div
          className="anime--display--img"
          style={{
            backgroundImage: `url(${mangaData.images.jpg.large_image_url})`,
          }}
        ></div>
        <div className="anime--display--ratings">
          <h4>MyAnimeList Stats</h4>
          <hr />
          <p>Rank - {mangaData.rank}</p>
          <p>Score - {mangaData.score}</p>
          <p>Score by - {mangaData.scored_by}</p>
        </div>
      </div>
      <div className="anime--display--right">
        <div>Genre - {genreLoader()}</div>

        <div>Status - {mangaData.status}</div>

        <div>Authors - {authorsLoader()}</div>

        <div>Serialization - {serializationsLoader()}</div>

      </div>
      <hr style={{ width: "100%" }} />
      <div className="anime--display--synopsis">
        <h4>Detailed Synopsis</h4>
        <p>{mangaData.synopsis}</p>
      </div>
      <hr style={{ width: "100%" }} />
    </div>
  );
}

export default MangaDisplay;