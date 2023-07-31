import React, { useEffect, useState } from 'react'
import Header from "../../component/Header/Header"
import BlogCard from '../../component/Blog/BlogCard'
import axios from "axios";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/post/all');
  console.log("response.data", response.data)
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchPosts();
  }, []);

  console.log("posts", posts)

  let postElements = posts.map(el => {
    return <BlogCard props={el} />
  })

  return (
    <div className="App">
      <Header />
      <div className="posts">
        {postElements}
      </div>
    </div>
  )
}
