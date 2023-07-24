import React,{useEffect,useContext} from 'react';
import {BrowserRouter,Routes ,Route} from 'react-router-dom'
import Signup from './Pages/Signup'
import './App.css';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import firebase from './Firebase/config';
import Login from './Components/Login/Login';
import { AuthContext } from './store/FirebaseContext';
import { getAuth } from 'firebase/auth';
import { getDocs,collection,query,where, getFirestore } from 'firebase/firestore';
import Create from './Components/Create/Create';
import View from './Components/View/View'
import Post from './store/postContext'


function App() {
  const {setUser}=useContext(AuthContext)
  const auth = getAuth(firebase)
  const firestore = getFirestore(firebase)
  useEffect(()=>{
  
    auth.onAuthStateChanged(async(user)=>{
      if(user){
        const q = query(collection(firestore,'user'),where('id','==',user.uid))
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          console.log('User not found');
        } else {
          const user = querySnapshot.docs[0].data();
          // console.log(user);
          setUser(user)
        }
      }
    })
    //  console.log(user);
  },[])
  return (
    <div>
      <Post>
      <BrowserRouter>
      <Routes>
        <Route exact path='/'  element={<Home />} />        
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/create' element={<Create />}/>
        <Route path='/view' element={<View />}/>
        </Routes>
      </BrowserRouter>
      </Post>
    </div>
  );
}

export default App;
