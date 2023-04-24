import React, { useEffect, useState } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import { db } from "./firebase";
import firebase from "firebase/compat/app";

function Post({ postId, user, username, caption, imageURL }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
        unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      username: user.displayName,
      text: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post__header">
  <Avatar
    className="post__avatar"
    alt="Logo"
    src="https://img.favpng.com/8/18/15/desktop-wallpaper-smile-blog-png-favpng-SZSSHkKNz5KpxqHUFT1fGT6xb.jpg"
  />

        <h3>{username}</h3>
      </div>

      <img className="post__image" src={imageURL} alt="" />

      <div className="post__text">
        
        <strong>{username}</strong> {caption}
      </div>

      <div className="post__comments">
      <p className="comments__head">Comments</p>
        {
          comments.map((comment)=>(
            <p className="post__comment">
              <b>{comment.username}</b> {comment.text}
            </p>
          ))
        }
      </div>

      <form className="post__commentBox" action="">
        <input
          className="post__input"
          type="text"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="post__button"
          disabled={!comment}
          type="submit"
          onClick={postComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Post;
