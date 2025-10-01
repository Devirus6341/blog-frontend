import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from 'axios'
import { useState, useEffect } from "react";
import { useContext } from "react";
import {UserContext} from '../UserContext'

function EditPost() {
  const [user] = useContext(UserContext)
      const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://blog-backend-r0rj.onrender.com/edit/post/${id}`, {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`
          }
        });
        const postData = response.data;
      setTitle(postData.title);
      setContent(postData.content);
      setAuthor(postData.author);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [id, user?.accessToken]);


const handleSubmit = async () => { 
    try {
    navigate('/user/posts')
    await axios.patch(`https://blog-backend-r0rj.onrender.com/edit`, {id, title, content} )
             
    } catch (error) {
        console.error(error)
    }
}

return (
    <div className="edit-form-container">
       <form className='edit-post-form' onSubmit={handleSubmit} >
        <input className="edit-title" type="text" onChange={(e)=> setTitle(e.target.value)} required defaultValue={title} placeholder="Title"/>
        <textarea className="edit-content"  onChange={(e)=> setContent(e.target.value)} required defaultValue={content} placeholder="Content"/>
        <input className="edit-author" type="text" disabled  required defaultValue={author} placeholder="Author"/>
        <button type="submit">Submit</button>
       </form>
    </div>
)
}

export default EditPost;