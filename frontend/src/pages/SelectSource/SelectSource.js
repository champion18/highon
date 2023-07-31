import React, { useState,useEffect } from "react";
import "./SelectSource.css";
import gallary from "../../Images/gallary.png";
import camera from "../../Images/camera.png";
import back from "../../Images/back.png";
import { useNavigate } from "react-router-dom";

const SelectSource = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    localStorage.removeItem("selectedImage");
    navigate("/createPost");
  };

  // const [image,setImage]=useState("");


  const handleGalleryClick = () => {
    // Open gallery and select an image
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        // Convert image to base64-encoded string
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const base64String = reader.result.split(",")[1]; // Extract base64 data
          // Save the image to local storage
          localStorage.setItem("selectedImage", base64String);
          navigate('/addDescription');
          // setImage(base64String);
        };
        
      }
    });

    input.click();
  };

  // useEffect(function(){
  //   const selectedImage = localStorage.getItem("selectedImage");
  //   console.log("effect")
  //   if (selectedImage) {
  //     console.log("navi")
  //     navigate('/addDescription');
  //   }
  // },[image])

  return (
    <div className="main">
      <img className="back" src={back} onClick={handleBack} alt=""></img>
      <div className="element">
        <div className="gallary" onClick={handleGalleryClick}>
          <img className="addC" alt="" src={gallary}></img>
          <span>Pick from gallery</span>
        </div>
        <hr />
        <div className="camera" onClick={handleGalleryClick}>
          <img className="addC" alt="" src={camera}></img>
          <span>Capture with camera</span>
        </div>
      </div>
    </div>
  );
};

export default SelectSource;
