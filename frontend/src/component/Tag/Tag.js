import React from "react";
import "./Tag.css";


const Tag = (props) => {
  return (
    <>
       <div className="vibeTags">
            <span>{props.props}</span>
      </div>

    </>
  );
};

export default Tag;