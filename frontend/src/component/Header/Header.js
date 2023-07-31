import React from "react";
import "./Header.css";
import profile from "../../Images/logo.png";
import add from "../../Images/AddPost@2x.png";
import search from "../../Images/search.png";
import { useNavigate  } from 'react-router-dom';

export default function Header() {

    const navigate = useNavigate ();

    const handleAddPostClick = () => {
        navigate('/createPost');
    };

  return (
    <div className="head-element">
      <img className="logo" alt="logo" src={profile}></img>
        <img className="addPost" alt="" src={add} onClick={handleAddPostClick} />
      <img className="search" alt="" src={search}></img>
    </div>
  );
}
