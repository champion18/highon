import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import back from "../../Images/back.png";
import "./Description.css";
import Tag from "../../component/Tag/Tag";
import camera from "../../Images/camera.png";
import food from "../../Images/food.png";
import game from "../../Images/game.png";
import axios from "axios";

const Description = () => {
  const [imageData, setImageData] = useState(null);
  const [selectedButton, setSelectedButton] = useState("");

  useEffect(() => {
    const base64String = localStorage.getItem("selectedImage");
    setImageData(base64String);
  }, []);


  // useEffect(() => {
  //   const fetchPosts = async (post) => {
  //     try {
  //       const response = await axios.post('http://localhost:5000/api/post/create',
  //       post
  //       );
  // // console.log("response.data", response.data)
  //       // setPosts(response.data.posts);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchPosts();
  // }, []);


  function makePost(){
    const text = document.getElementById("textInput");
    //text.value
    
  }



  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/selectSource");
  };

  function selectVibe(event) {
    const clickedButton = event.target.innerText;
    setSelectedButton((prevSelected) =>
      prevSelected === clickedButton ? "" : clickedButton
    );
  }
  console.log(selectedButton)

  return (
    <div className="full">
      <div className="top">
        <img alt="" onClick={handleBack} src={back}></img>
        <button className="postButton" onClick={makePost}>Post</button>
      </div>
      <div className="details">
        {imageData ? (
          <img
            className="postImg"
            src={`data:image/jpeg;base64,${imageData}`}
            alt=""
          />
        ) : (
          <p>No image selected.</p>
        )}
        <p className="ptag">Description</p>
        <textarea id="textInput" className="input"></textarea>
        <hr></hr>
        <Tag />
        <p className="vibeText">Add your vibetags</p>
        <div className="vibeTagDiv">
          <button className={selectedButton === 'Photography' ? 'selected' : 'vibeTags'}
           onClick={selectVibe}
           >
            <img src={camera} alt=""></img>
            <span>Photography</span>
          </button>
          <button className={selectedButton === 'Food vlogs' ? 'selected' : 'vibeTags'}
           onClick={selectVibe}>
            <img src={food} alt=""></img>
            <span>Food vlogs</span>
          </button>
          <button className={selectedButton === 'Gaming' ? 'selected' : 'vibeTags'}
           onClick={selectVibe}>
            <img src={game} alt=""></img>
            <span>Gaming</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Description;