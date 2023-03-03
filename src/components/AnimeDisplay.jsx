import React from "react";
import ReactDOM from "react-dom/client";
import { useParams } from "react-router-dom";

function AnimeDisplay() {
  let { id } = useParams();
  let [animeData, setAnimeData] = React.useState({
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
    airing: true,
    aired: {},
    duration: "string",
    rating: "G - All Ages",
    score: 0,
    scored_by: 0,
    rank: 0,
    popularity: 0,
    members: 0,
    favorites: 0,
    synopsis: "string",
    background: "string",
    season: "summer",
    year: 0,
    broadcast: {},
    producers: [],
    licensors: [],
    studios: [],
    genres: [],
    explicit_genres: [],
    themes: [],
    demographics: [],
    relations: [],
    theme: {},
    external: [],
    streaming: [],
  });

  async function getAnime() {
    let data = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
    data = await data.json();
    data = data.data;
    setAnimeData((prevAnimeData) => {
      return { ...prevAnimeData, ...data };
    });
  }

  function genreLoader() {
    let genres = animeData.genres.map((item) => {
      return item.name + ", ";
    });
    return genres;
  }
  function studioLoader() {
    let studios = animeData.studios.map((item) => {
      return item.name + ", ";
    });
    return studios;
  }
  function producerLoader() {
    let producers = animeData.producers.map((item) => {
      return item.name + ", ";
    });
    return producers;
  }
  function streamingLoader() {
    let i = 1;
    let streams = animeData.streaming.map((item) => {
      return (
        <a href={item.url} key={i++}>
          {item.name}
        </a>
      );
    });
    return streams;
  }

  React.useEffect(() => {
    getAnime();
  }, []);

  return (
    <div className="anime--display">
      <div className="anime--display--left">
        <div className="anime--display--title">
          <h2>
            {animeData.title} ({animeData.type})
          </h2>
          <p>
            {animeData.season} -- {animeData.year}
          </p>
        </div>
        <hr />
        <div
          className="anime--display--img"
          style={{
            backgroundImage: `url(${animeData.images.jpg.large_image_url})`,
          }}
        ></div>
        <div className="anime--display--ratings">
          <h4>MyAnimeList Stats</h4>
          <hr />
          <p>Rank - {animeData.rank}</p>
          <p>Score - {animeData.score}</p>
          <p>Score by - {animeData.scored_by}</p>
        </div>
      </div>
      <div className="anime--display--right">
        <div>Genre - {genreLoader()}</div>

        <div>Aired - {animeData.aired.string}</div>

        <div>Status - {animeData.status}</div>

        <div>Studios - {studioLoader()}</div>

        <div>Producers - {producerLoader()}</div>

        <div>Streaming - {streamingLoader()}</div>
      </div>
      <hr style={{ width: "100%" }} />
      <div className="anime--display--synopsis">
        <h4>Detailed Synopsis</h4>
        <p>{animeData.synopsis}</p>
      </div>
      <hr style={{ width: "100%" }} />
      <div className="anime--display--trailer">
        <h4>Trailer</h4>
        <iframe
          className="anime--display--iframe"
          src={`https://www.youtube.com/embed/${animeData.trailer.youtube_id}?enablejsapi=1&wmode=opaque&`}
        ></iframe>
      </div>
    </div>
  );
}

export default AnimeDisplay;
