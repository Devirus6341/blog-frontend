import { Link } from "react-router-dom";
import axios from 'axios';
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import '../styles/home.css';

function Home({ logout }) {
  const [user] = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const blogs = async () => {
      try {
        const response = await axios.get(
          'https://blog-backend-r0rj.onrender.com/posts',
          { withCredentials: true }
        );
        setPosts(response.data.posts);
      } catch (error) {
        console.log(error);
      }
    };
    blogs();
  }, []);

  const handleViewPost = async (title) => {
    await axios.post('https://blog-backend-r0rj.onrender.com/post', { title });
  };

  return (
    <div className="container">
      <header className="blog-header">
        <div className="blog-title">
          <img
            className="blog-logo"
            src="images/My-Logo transparent.png"
            alt="Blog-logo"
          />
        </div>

        <div className="dropdown">
          <button className="dropbtn">Menu</button>
          <div className="dropdown-content">
            {user ? (
              <>
                <Link className="dropdown-link" to="/create">Create Post</Link>
                <Link className="dropdown-link" to="/user/posts">View My Posts</Link>
                <button className="dropdown-link" onClick={logout}>Log out</button>
              </>
            ) : (
              <>
                <Link className="dropdown-link" to="/login">Login</Link>
                <Link className="dropdown-link" to="/signup">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </header>

      <h2>SEE LATEST POSTS</h2>
      <div className="body-container">
        {posts.map((post, index) => (
          <Link
            to="/post"
            onClick={() => handleViewPost(post.title)}
            className="post-link"
            key={index}
          >
            <h3 className="post-link-title">{post.title}</h3>
            <p>{post.date}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
