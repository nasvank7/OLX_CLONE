import React, { useState} from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { signInWithEmailAndPassword,getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import firebase from '../../Firebase/config'

function Login() {
  const [email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const [errMsg, setErrMsg] = useState('')
  const nav=useNavigate()
  const handleLogin=(e)=>{
        e.preventDefault()
        const auth=getAuth(firebase)
        signInWithEmailAndPassword(auth,email,password)
        .then(()=>{
          nav('/')
        }).catch((err)=>{
       console.log(err.message);
       let error=err.message.split("/")[1]
       setErrMsg(error)
       setTimeout(()=>{
        setErrMsg("")
       },3000)
        })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            id="fname"
            onChange={(e)=>setEmail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            id="lname"
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button onClick={handleLogin}>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
