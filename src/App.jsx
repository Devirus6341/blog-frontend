import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import SignUp from './components/SignUp';
import Login from './components/Login';
import UserPosts from './components/ViewUserPosts';
import ViewPost from './components/ViewPosts';
import { UserContext } from './UserContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

// Private route wrapper
const PrivateRoute = ({ element }) => {
  const [user] = useState(UserContext._currentValue); // consume context
  return user ? element : <Navigate to="/login" replace />;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRefreshToken = async () => {
      try {
        const result = await axios.post(
          "https://blog-backend-r0rj.onrender.com/refresh_token",
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
        setLoading(false);
      }
    };

    checkRefreshToken();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://blog-backend-r0rj.onrender.com/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.log("Logout failed:", err);
    } finally {
      setUser(null);
    }
  };

  if (loading) return <div>...loading</div>;

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home logout={handleLogout} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<ViewPost />} />

        {/* Private Routes */}
        <Route
          path="/user/posts"
          element={
            user ? <UserPosts /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/create"
          element={
            user ? <CreatePost /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/edit/:id"
          element={
            user ? <EditPost /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;