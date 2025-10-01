import { Link, Navigate } from "react-router-dom"
import axios from 'axios';
import { useContext, useState } from "react";
import { useEffect } from "react";
import { UserContext } from "../UserContext";

 function Home({logout}) {
  const [user] = useContext(UserContext)
const [posts, setPosts] = useState ([]);

useEffect(() => {
    const blogs = async () => {
      
      try {
             const response = await axios.get('http://localhost:5000/posts', {withCredentials: true})
              const data = response.data;
           setPosts(data.posts);
      } catch (error) {
        console.log(error);
      }
    }
    blogs();
  }, []); 

  if (!user?.accessToken) {
  return <Navigate to='/login' replace/>
 }

  const handleViewPost = async(title) => {
    await axios.post('http://localhost:5000/post', {title})
  }


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
             <button className="dropdown-link" onClick={logout}>Log out</button>
            </div>
          </div>
      </header>
          <h2>SEE LATEST POSTS</h2>
<div className="body-container">
    {posts.map((post, index) => {
     return <Link to='/post' onClick={() =>handleViewPost(post.title)} className="post-link" key={index} >
      <h3 className="post-link-title">{post.title}</h3>
        <p> {post.date}</p>
     </Link>
    })}
</div>

    </div>
  )
}

export default Home
