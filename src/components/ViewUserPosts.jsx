import { Link } from "react-router-dom"
import axios from 'axios';
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";

 function UserPosts() {
  const [user] = useContext(UserContext);
const [posts, setPosts] = useState ([]);

useEffect(() => {
    const blogs = async () => {
      try {
        const response = await axios.get('https://blog-backend-r0rj.onrender.com/user/posts', {
              headers: {
            Authorization: `Bearer ${user?.accessToken}`
          }
        });
        const data = response.data;
        setPosts(data.currentUserPosts);
      } catch (error) {
        console.log(error);
      }
    }
    blogs();
  }, [posts,user?.accessToken]);


    const handleDelete = async(id) => {
      const confirmDelete = window.confirm('Are you sure you want to delete This Post?');
      if (!confirmDelete) return;

      try {
    const response = await axios.delete(`https://blog-backend-r0rj.onrender.com/delete/${id}`, {  headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      }, withCredentials:true});
    alert('Post Deleted Successfully')
     setPosts(response.data)
    } catch(error) {
      console.log(error)
     }
  }

  return (
    <>
      <h2>Your Posts</h2>
<div className="body-container">
 {posts.map((post, index) => {
     return <div className="blog-container" key={index} >
      <h3 className="blog-title">{post.title}</h3>
      <p className="blog-content">{post.content}</p>
      <div className="post-details">
        <p> Date: <span className="blog-date">{post.date}</span></p>
        <p> Time of Post: <span className="blog-date">{post.time}</span></p>
        <div className="blog-btns">
        <Link to={`/edit/${post.id}`} className="edit-blog-btn">Edit Post</Link>
        <Link className="delete-blog-btn" onClick={() => handleDelete(post.id)}> Delete Post</Link>
        </div>
      </div>
     </div>
    })}
       </div>
    </>
  )
}

export default UserPosts
