import React from "react";
import "./Tag.css";
import tagIcon from "../../Images/tag.png";
import locIcon from "../../Images/location.png";

const Tag = () => {

    const [showT,setShowT] = React.useState(false)
    const [showL,setShowL] = React.useState(false)

    function showHideT(){
        setShowT((old)=>!old)
    }

    function showHideL(){
        setShowL((old)=>!old)
    }
  return (
    <>
      <div className="tag" onClick={showHideT}>
        <img src={tagIcon} alt=""></img>
        <span>Tag People</span>
      </div>
      <hr/>
      { showT && <div className="tagged">
            people to tag
      </div>}
      <div className="tag" onClick={showHideL}>
        <img src={locIcon} alt=""></img>
        <span>Location</span>
      </div>
      { showL && <div className="located">
            location to display
      </div>}
      <hr/>
    </>
  );
};

export default Tag;
