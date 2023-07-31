import React from "react"
import "./BlogCard.css"
import empty from "../../Images/emptyH.png"
import full from "../../Images/fullH.png"
import sample from "../../Images/sample.jpg"

export default function BlogCard(props){
    console.log("BlogCard",props)
    return (
        <div className="card">
            <img alt="" className="blog-img" src={props.props.image.url}>
            </img>
            <img alt="" className="empty heart" src={empty}></img>
            {/* <img alt="" className="full heart" src={full}></img> */}
        </div>
    )
}