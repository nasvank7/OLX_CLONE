import React, { useState ,useContext} from 'react';
import { useNavigate } from "react-router-dom";


import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import firebase from "../../Firebase/config";
import { collection, addDoc, getFirestore } from "firebase/firestore";

export default function Signup() {
    const [errMsg, setErrMsg] = useState('');
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [password,setPassword]=useState('')
  const nav=useNavigate()
// const {firebase}=useContext(FirebaseContext)

  const handleSubmit=(e)=>{
    e.preventDefault()
    const auth = getAuth(firebase); 
    const firestore =getFirestore(firebase)
    createUserWithEmailAndPassword(auth,email,password).then(async(result)=>{
      const uid=result.user.uid
      await addDoc(collection(firestore,"user"),{
        id:uid,
        name:username,
        email:email,
        mobile:phone
      });
        
      console.log("User updated Successfullly");
      nav('/login')
    }).catch((err)=>{
      console.log(err.message,"ERROR");
      let error=err.meassge.split("/")[1].split("")[0].trim()
      setErrMsg(error)
      
    })

  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            onChange={(e)=>setEmail(e.target.value)}

            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            onChange={(e)=>setPhone(e.target.value)}

            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            onChange={(e)=>setPassword(e.target.value)}

            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
