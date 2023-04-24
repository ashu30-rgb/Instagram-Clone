import React, { useState } from 'react'
import firebase from 'firebase/compat/app';
import { db, storage } from "./firebase.js";
import './ImageUpload.css'


function ImageUpload(username) {
    
    const [image, setImage] = useState(null)
    const [caption, setCaption] = useState('')
    const [progress, setProgress] = useState(0)
    
    const handleChange= (e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    };
    
    const handleUpload = () =>{
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
        "state_changed",
        (snapshot)=>{
            const progress = Math.round(
                (snapshot.bytesTransferred/snapshot.totalBytes)*1000
            );
            setProgress(progress);
        },
        (error) =>{
            console.log(error)
            alert(error.message)
        },
        ()=>{
            storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url=>{
                db.collection("posts").add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    caption: caption,
                    imageURL: url,
                    username: username.username
                });
                setProgress(0);
                setCaption("");
                setImage(null);
            })
        }
    )
   
}
    
  return (
    <div className= "imageupload">
      <h1>Image upload</h1>
      <progress className='imageupload__progress' value={progress} max="100" ></progress>
      <input type="text" placeholder='Enter a caption....' onChange={event=> setCaption(event.target.value)} value={caption}/>
      <input type="file" onChange={handleChange} />
      <button className='Imageupload__button' onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default ImageUpload
