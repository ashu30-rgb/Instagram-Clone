import { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase.js";
import Box from "@mui/material/Box";
// import Button from '@mui/material/Button';
import Modal from "@mui/material/Modal";
import ImageUpload from "./ImageUpload";
import About from "./About";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [authButton, setAuthButton] = useState(false);
  const [openSignIn, setOpenSignin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        setUser(authuser);
        console.log("authuser");
        console.log(authuser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  const signup = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authuser) => {
        return authuser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
  };

  const signin = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenSignin(false);
  };


  return (
    <>
      <div className="app">
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={style}>
            <form className="app__signup">
              <img
                className="app__headerImage"
                src="https://upload.wikimedia.org/wikipedia/commons/0/06/İnstagram-Profilime-Kim-Baktı-1.png"
                alt=""
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" onClick={signup} >
                Sign Up
              </button>
            </form>
          </Box>
        </Modal>

        <Modal open={openSignIn} onClose={() => setOpenSignin(false)}>
          <Box sx={style}>
            <form className="app__signup">
              <img
                className="app__headerImage"
                src="https://upload.wikimedia.org/wikipedia/commons/0/06/İnstagram-Profilime-Kim-Baktı-1.png"
                alt=""
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" onClick={signin}>
                Log In
              </button>
            </form>
            <button className="signup__button" onClick={() => setOpen(true)}>
              Don't have an account? Sign Up
            </button>
          </Box>
        </Modal>

        <Modal open={authButton} onClose={() => setAuthButton(false)}>
          <Box sx={style}>
            {user?.displayName ? (
              <ImageUpload username={user.displayName} />
            ) : (
              <h3>Login to Upload</h3>
            )}
          </Box>
        </Modal>

        <div className="app__header">
          <img
            className="app__headerImage"
            src="https://upload.wikimedia.org/wikipedia/commons/0/06/İnstagram-Profilime-Kim-Baktı-1.png"
            alt=""
          />

          <button className="auth__button" onClick={() => setAuthButton(true)}>
            Add Post
          </button>
          {user ? (
            <button className="auth__button" onClick={() => auth.signOut()}>
              Logout
            </button>
          ) : (
            <button
              className="auth__button"
              onClick={() => setOpenSignin(true)}
            >
              Sign In
            </button>
          )}
        </div>

        <div className="app__posts">
          <div className="app__postsLeft">
            {posts.map(({ id, post }) => (
              <Post
                key={id}
                postId={id}
                user={user}
                username={post.username}
                caption={post.caption}
                imageURL={post.imageURL}
              />
            ))}
          </div>
          <div className="app__postsRight">
            
             <About/>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
