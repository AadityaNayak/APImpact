import React from "react";
import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="header--logo"></div>
      <ul className="header--nav">
        <li>
          <Link to="/jokes" className="text-link">Jokes</Link>
        </li>
        <li>
          <Link to="/movies" className="text-link">Movies</Link>
        </li>
        <li>
          <Link to="/anime" className="text-link">Anime</Link>
        </li>
        <li>
          <Link to="/stories" className="text-link">Stories</Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
