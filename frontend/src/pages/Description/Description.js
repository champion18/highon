import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import back from "../../Images/back.png";
import "./Description.css";
import Tag from "../../component/Tag/Tag";
import camera from "../../Images/camera.png";
import food from "../../Images/food.png";
import game from "../../Images/game.png";
import axios from "axios";
import tagIcon from "../../Images/tag.png";
import locIcon from "../../Images/location.png";
const Description = () => {
  const [imageData, setImageData] = useState(null);
  const [selectedButton, setSelectedButton] = useState("");

  const [showT, setShowT] = React.useState(false)
  const [showL, setShowL] = React.useState(false)

  function showHideT() {
    setShowT((old) => !old)
  }

  function showHideL() {
    setShowL((old) => !old)
  }

  useEffect(() => {
    const base64String = localStorage.getItem("selectedImage");
    setImageData(base64String);
  }, []);

  function makePost() {
    const descriptionInput = document.getElementById("textInput");
    const vibetags = selectedButton;

    let post = {
      description: descriptionInput.value,
      vibetags,
      image: imageData
    }
    fetchPosts(post);
  }

  const fetchPosts = async (post) => {
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

  const [people, setPeople] = useState([{
    username: "sherlock_holmes"
  }, {
    username: "emilia_jones"
  }])

  const peopleToTag = people.map(el => {
    return <Tag props={el.username} />
  })

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

        <div className="tag" onClick={showHideT}>
          <img src={tagIcon} alt=""></img>
          <span>Tag People</span>
        </div>
        {showT && <div className="peopleTagDiv">
          {peopleToTag}
        </div>}

        <div className="tag" onClick={showHideL}>
          <img src={locIcon} alt=""></img>
          <span>Location</span>
        </div>
        {showL && <div className="located">
          location to display
        </div>}

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