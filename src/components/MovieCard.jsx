import React from 'react';
import ReactDOM from 'react-dom/client';

function MovieCard(props) {

  return (
    <div className='movies--card'>
        <div className='movie--card--poster' style={{backgroundImage:`url(${props.poster})`}}>
        </div>
        <div className='movie--card--title'>
            {props.title}
        </div>
        <div className='movie--card--type'>
            {/* <div>{props.ratings[0].Source}: {props.ratings[0].Value}</div>
            <div>{props.ratings[1].Source}: {props.ratings[1].Value}</div>
            <div>{props.ratings[2].Source}: {props.ratings[2].Value}</div> */}
            <div>Type: {props.type}</div>
            
        </div>
        <button className='movie--card--favourite'>
            Add To favourite
        </button>
    </div>
  );
}

export default MovieCard;
