import React from "react";
import "./About.css";
import { Avatar } from "@material-ui/core";

function About() {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="Logo"
          src="https://mir-s3-cdn-cf.behance.net/projects/404/8e6692141570489.Y3JvcCw4OTksNzAzLDYyLDUz.png"
        />

        <h2>About the developer</h2>
      </div>

      <img
        className="post__image"
        src="https://firebasestorage.googleapis.com/v0/b/insta-clone-react-c64b7.appspot.com/o/Avatar%2FDF4D3854-AB91-4CCC-A48C-78FDF0ED409C.PNG?alt=media&token=afc99507-eb6e-4812-9140-4cdb67ab88f4"
        alt=""
      />

      <div className="post__text">
        <h3>Ashutosh kumar verma</h3>

        <br />
        <p>
            <p>
          👋 Hi there! I'm a BCA Honours graduate from Lovely Professional
          University 🎓, with expertise in HTML, CSS, JavaScript, and React ⚛️.
          I'm committed to delivering high-quality work that exceeds
          expectations and have a solid understanding of user experience design
          principles 🚀. As a team player with excellent communication skills
          💬, I'm eager to contribute my skills and expertise as a Frontend
          Developer 🤝. </p>
          <br />
          Here are some key points that highlight my skills and abilities:
          <br/>
          <ul>
            <li>
              💻 Proficient in HTML, CSS, JavaScript, React, Bootstrap,
              Tailwind, and SCSS.
            </li>
            <li>
              📷 Skilled in Photoshop (PS), Premiere Pro(PR), and Final Cut Pro
              (FCP).
            </li>
            <li>
              👨‍💼 Experienced in collaborating with cross-functional teams to
              deliver successful projects.
            </li>
            <li>
              🌟 Passionate about staying up-to-date with the latest
              technologies and trends in the frontend development industry.
            </li>
          </ul>
          <br />
          With my strong technical background and creative flair, I'm confident
          that I can make a valuable contribution to any team. Thank you for
          visiting my application! 💯.
        </p>
      </div>
    </div>
  );
}

export default About;
