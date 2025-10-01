import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useState } from "react";
import { useContext } from "react";
import {UserContext}from '../UserContext'
import '../styles/createpost.css'

function CreatePost() {
    const [user] = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

const handleSubmit = async () => { 
    try {
         navigate('/')
         
             await axios.post("https://blog-backend-r0rj.onrender.com/create", {title, content}, {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}` 
                },
                withCredentials:true
             } );
             
    } catch (error) {
        console.error(error)
    }
}

return (
    <div className="post-form-container">
       <form className='post-form' onSubmit={handleSubmit} >
        <input className="post-title" type="text" onChange={(e)=> setTitle(e.target.value)} required value={title} placeholder="Title"/>
        <textarea className="post-content" onChange={(e)=> setContent(e.target.value)} required value={content} placeholder="Content"/>
        <button type="submit">Submit Post</button>
       </form>
    </div>
)
}

export default CreatePost;