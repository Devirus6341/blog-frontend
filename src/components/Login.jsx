import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";

function Login() {
const [user, setUser] = useContext(UserContext)
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");

const navigate = useNavigate();

     useEffect(()=> {
                setTimeout(() => {
                   setError("") 
                }, 3000);
               },[error])

    const handleLogin = async(event) =>{
        event.preventDefault();
     const response =   await axios.post("https://blog-backend-r0rj.onrender.com/login", {email, password}, {withCredentials:true});  
        const data = response.data;
        if (data.accessToken){
            setUser({accessToken: data.accessToken})  
            console.log(user)
            navigate("/")
        } else {
            setError(data.notAuthenticated)
        }   
    } 

   
    return (
       <div className="sign-up">
        {error && <div className="error-message">{error} &#9888;</div>}
        <div>
            <img src="images/My-Logo transparent.png" alt="Blog-Logo" /> 
        </div>
        <div className="sign-up-text"> <p>Login</p></div> 
        <div>
            <form className="signup-form" onSubmit={handleLogin}>
            <input className="signup-form-input" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required/>
            <input className="signup-form-input" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required/>
            <button type="submit">Login</button>
            </form>
        </div>
          <div>
             <p>Don't Have An Account? <Link to="/">SignUp</Link></p>
             </div>
       </div>
    )    
}

export default Login;