import { Link, Navigate } from "react-router-dom"
import axios from 'axios';
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";

 function ViewPost() {
const [post, setPost] = useState ("");
const [user] = useContext(UserContext);

if (!user?.accessToken) {
  <Navigate to='/login' replace/>
}
useEffect(() => {
    const blogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/post',);
        const data = response.data;
        setPost(data);
      } catch (error) {
        console.log(error);
      }
    }
    blogs();
  }, []);


  return (
    < div className="container">
      <header className="blog-header">
        <div className="blog-title">
          <img className="blog-logo" src="images/My-Logo transparent.png" alt="Blog-logo" />
        </div>
          <div className="dropdown">
            <button className="dropbtn">Menu</button>
            <div  className="dropdown-content">
              <Link className="dropdown-link" to='/create'>Create Post</Link>
              <Link className="dropdown-link" to='/user/posts'>View My posts</Link>
              <Link className="dropdown-link" to='/login'>Log out</Link>
            </div>
          </div>
      </header>
      
          <h2>{post.title}</h2>
   <div className="body-container">
     <div className="blog-container"  >
      <p className="blog-content">{post.content}</p>
      <div className="post-details">
        <p className="blog-author"> Post By: <span >{post.author}</span></p>
        <p> Date: <span className="blog-date">{post.date}</span></p>
        <p> Time Of Post: <span className="blog-date">{post.time}</span></p>
      </div>
     </div>
</div>

    </div>
  )
}

export default ViewPost
