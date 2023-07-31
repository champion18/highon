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

  function makePost() {
    const descriptionInput = document.getElementById("textInput");
    const vibetags = selectedButton;

    console.log("imageData", imageData)

    // // Decode the base64 string to binary data
    // const binaryImageData = atob(imageData);

    // // Convert the binary data to a Uint8Array
    // const bytes = new Uint8Array(binaryImageData.length);
    // for (let i = 0; i < binaryImageData.length; i++) {
    //   bytes[i] = binaryImageData.charCodeAt(i);
    // }

    // // Create a Blob from the Uint8Array
    // const blob = new Blob([bytes], { type: 'image/jpeg' });

    // // Create a URL for the Blob
    // const imageUrl = URL.createObjectURL(blob);

    // // Use the imageUrl to display the image or perform further processing (e.g., save the image as a file)

    let post = {
      description: descriptionInput.value,
      vibetags,
      image: imageData
    }
    fetchPosts(post);
  }

  const fetchPosts = async (post) => {
    console.log("post", post)

    try {
      const response = await axios.post('http://localhost:5000/api/post/create',
        post
      );
      console.log(" fetchPosts response", response)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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