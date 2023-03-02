import React from "react";
import ReactDOM from "react-dom/client";
import { useNavigate } from "react-router-dom";

function AnimeCard(props) {


  function genreLoader(){
    let genres = (props.genres).map((item)=>{
      return(item.name + ', ');
    })
    return genres;
  }

  return (
    <div className="anime--card">
        <div className="anime--card--img" style={{backgroundImage:`url(${props.image})`}}>
        </div>
        <h3>{props.title} </h3>
        <p>{props.season} -- {props.year}</p>
        <hr style={{width: "100%"}}/>
        <div className="anime--card--info">
          <div>Type - {props.type} </div>
          <div>Genre - {genreLoader()}</div>
        </div>
    </div>
  );
}

export default AnimeCard;
