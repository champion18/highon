import React from "react";
import add from "../../Images/AddPost.png";
import cross from "../../Images/cross1.png";
import "./CreatePost.css";
import { useNavigate  } from 'react-router-dom';

const CreatePost = () => {

  const navigate = useNavigate ();

  const handleBack = () => {
      navigate('/');
  };

  const handleSource=()=>{
    navigate('/selectSource')
  }

  return (
    <div className="bodyEle">
        <img className="cross" alt="" onClick={handleBack} src={cross}></img>
      <div className="ele">
        <div className="post" onClick={handleSource}>
          <img className="addB"alt="" src={add}></img>
          <span>Create a Post</span>
        </div>
        <hr/>
        <div className="story"  onClick={handleSource}>
          <img className="addB"alt="" src={add}></img>
          <span>Create a Story</span>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
