import React from "react";
import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="header--logo"></div>
      <ul className="header--nav">
        <Link to="/jokes" className="text-link">
          <li>Jokes</li>
        </Link>
        <Link to="/movies" className="text-link">
          <li>Movies</li>
        </Link>
        <Link to="/anime" className="text-link">
          <li>Anime</li>
        </Link>
        <Link to="/stories" className="text-link">
          <li>Stories</li>
        </Link>
      </ul>
    </div>
  );
}

export default Header;
