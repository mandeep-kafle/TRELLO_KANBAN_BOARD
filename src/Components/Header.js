import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
//----------------------------------------------------
import "../Styles/Header.css";
import logo from "../assets/Trello.png"
function Header() {
  return (
    <div className="header">
      <div class="header__icons">
    
        <div class="header__icon--active">
         <img src={logo}   width="30" 
     height="30" />
        </div>
        <div class="header__icon--active">
          <h2>Trello</h2>
        </div>
        <div class="header__icon">
          <HomeIcon />
          <p>Home</p>
        </div>
        
        <div class="header__icon">
          <SearchIcon />
          <p>Search</p>
        </div>
        <div class="header__icon">
          <PersonOutlineIcon />
          <p>Profile</p>
        </div>
      </div>
      <img src="" alt="" />
    </div>
  );
}

export default Header;