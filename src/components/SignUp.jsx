import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate();

    const handleSignUp = async(event) =>{
        event.preventDefault();
     const response =   await axios.post("https://blog-backend-r0rj.onrender.com/signup", {email, password});  
        const data = response.data;
        console.log(data)
        if (data.authenticated) {
            navigate("/")
        } else {
            navigate("/login")
        }   
    } 

    return (
       <div className="sign-up">
        <div>
            <img src="images/My-Logo transparent.png" alt="Blog-Logo" /> 
        </div>
        <div className="sign-up-text"> <p>SignUp</p></div> 
        <div>
            <form className="signup-form" onSubmit={handleSignUp}>
            <input className="signup-form-input" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required/>
            <input className="signup-form-input" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required/>
            <button type="submit">Signup</button>
            </form>
        </div>
          <div>
             <p>Already Have An Account? <Link to='/login'>Login</Link></p>
             </div>
       </div>
    )    
}

export default SignUp;