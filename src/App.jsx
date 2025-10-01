import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import CreatePost from './components/CreatePost'
import EditPost from './components/EditPost'
import SignUp from './components/SignUp'
import Login from './components/Login.Jsx'
import UserPosts from './components/ViewUserPosts'
import ViewPost from './components/ViewPosts'
import { UserContext } from './UserContext'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const checkRefreshToken = async () => {
      try {
        const result = await axios.post(
          "http://localhost:5000/refresh_token",
          {},
          { withCredentials: true }
        );

        if (result.data.accessToken) {
          setUser({ accessToken: result.data.accessToken });
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Failed to refresh token:", err);
        setUser(null);
      } finally {
        setLoading(false)
      }
    };

    checkRefreshToken();
  }, []);


const handleLogout = async () => {
  try {
    await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
   
  } catch (err) {
    console.log("Logout failed:", err);
  } finally {
    setUser(null); 
  }
};

  if (loading) return <div>...loading</div>
  return (
    <>
    <UserContext.Provider value={[user, setUser]}>
      <Routes>
        <Route path='/' element={<Home logout={handleLogout}/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/login' element={<Login/>} />
         <Route path='/post' element={<ViewPost/>} />
        <Route path='/user/posts' element={<UserPosts/>} />
        <Route path='/create' element={<CreatePost/>} />
        <Route path='/edit/:id' element={<EditPost/>} />
      </Routes>
      </UserContext.Provider>
    </>
  )
}



export default App
