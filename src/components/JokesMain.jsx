import React from 'react';
import ReactDOM from 'react-dom/client';

function JokesMain() {

    let [joke, setJoke] = React.useState({
        category:"", setup:"", delivery:""
    });

    async function getJokedata(){
      // https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart
        let joke_data = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart')
        joke_data = await joke_data.json();
        console.log(joke_data)
        setJoke(joke_data);
    }

    React.useEffect(()=>{
            getJokedata();       
    }, [])

  return (
    <div className='jokes--card'>
      <div className='jokes--card--title'>{joke.category} Joke</div>
      <hr />
      <div className='jokes--card--setup'>
        {joke.setup}
      </div>
      <div className='jokes--card--punchline'>
      {joke.delivery}
      </div>
      <div className='jokes--card--button' onClick={()=>getJokedata()}>
        Tell me another joke
      </div>
    </div>
  );
}

export default JokesMain;
