import React, { Fragment, useState ,useContext} from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext } from '../../store/FirebaseContext';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import firebase from '../../Firebase/config';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const { user } = useContext(AuthContext)

const [name,setName]=useState('')
const [category,setCategory]=useState('')
const [price,setPrice]=useState('')
const [image,setImage]=useState([])
const [imageDataUrl, setImageDataUrl] = useState('')
const firestorage=getStorage(firebase)
const firestore = getFirestore(firebase)
const nav = useNavigate()

 const handleImageChange=(e)=>{
  const file = e.target.files[0];
  const blob = new Blob([file], { type: file.type });
  setImage(file)
  const reader = new FileReader();
  reader.onload = () => {
    const url = reader.result;
    setImageDataUrl(url);
  };
  reader.readAsDataURL(blob);
 }

const handleSubmit=()=>{
  const date=new Date()
  if(user){
    const storageRef=ref(firestorage,`/images/${image.name}`)
    const imageBlob =new Blob([image],{type:image.type})

    uploadBytes(storageRef,imageBlob).then((snapshot)=>{
      getDownloadURL(ref(firestorage,`/images/${image.name}`))
      .then(async(url)=>{
        console.log(url);
        await addDoc(collection(firestore,"products"),{
          productName:name,
          category:category,
          price:price,
          image:url,
          CreatedAt:date.toDateString(),
          userId:user.id
        });
        console.log("product added successfully");
        nav('/')
      })
    })
  }else{
    console.log("plz login again");
  }

}
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
        
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={name}
              name="Name"
              onChange={(e)=>setName(e.target.value)}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              value={category}

              type="text"
              id="fname"
              onChange={(e)=>setCategory(e.target.value)}

              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
      
            <input className="input" value={price} type="number" onChange={(e)=>setPrice(e.target.value)}
 id="fname" name="Price" />
            <br />
         
          <br />
          <img  alt="Posts" width="200px" height="200px" src={imageDataUrl ? imageDataUrl : ''}></img>
        
            <br />
            <input onChange={handleImageChange}type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
       
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
