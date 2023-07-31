import React, { useEffect, useState } from 'react'
import Header from "../../component/Header/Header"
import Post from '../../component/Post/Post.js'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const { id } = useParams();
  console.log("id", id)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/post/all');
        let postsArr = response.data.posts;

        let newPostArr = postsArr.map(el => {
          return { ...el, isLiked: false }

        })

        setPosts(newPostArr);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchPosts();
  }, []);


  function handleLike(e, id) {
    e.stopPropagation();
    setPosts((oldPost) => {
      return oldPost.map(post => post._id === id ? { ...post, isLiked: !post.isLiked } : post)
    })
  }

  let postElements = posts.map(el => {
    // return <Post key={el._id} props={el} handleLike={(e) => handleLike(e, el._id)} handleViewPost={() => handleViewPost(el._id)} />
    return <Post key={el._id} props={el} handleLike={(e) => handleLike(e, el._id)}/>
  })

  for (let i = 0; i < postElements.length; i++) {
    if (postElements[i].key === id) {
    console.log("reshuffled", id)

      let temp = postElements[0];
      postElements[0] = postElements[i];
      postElements[i] = temp;
    }
  }

  console.log("postElements", postElements)

  return (
    <div className="App">
      <Header />
      <div className="posts-timeline">
        {postElements}
      </div>
    </div>
  )
}


export default AllPosts;