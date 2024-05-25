import React from "react";
import "../assets/styles/ProfileCard.css";
import avatar from "../assets/img/images.jpeg";
import { useState,useEffect } from "react";

function ProfileCard({userName,profilePicture,phoneNumber,userID,email}) {
	const [imgPath, setImgPath] = useState("");
	useEffect(() => {
		setImgPath("http://localhost:8080/"+`${profilePicture}`)
	  }, [setImgPath]);
	return (
		<div className="card-container">
			<header>
				<img src={imgPath} alt={userName} />
			</header>
			{/* <h1 className="bold-text">
				{props.name} <span className="normal-text">{props.age}</span>
			</h1> */}
            <h1 className="bold-text">
				{/* {props.firstName+" "+props.lastName} */}
                {userName}
			</h1>
			{/* <h2 className="normal-text">{props.city}</h2> */}
            <h2 className="normal-text">+84{phoneNumber}</h2>
            <h2 className="normal-text">{email}</h2>
			{/* <div className="social-container">
				<div className="followers">
					<h1 className="bold-text">{props.followers}</h1>
					<h2 className="smaller-text">Followers</h2>
				</div>
				<div className="likes">
					<h1 className="bold-text">{props.likes}</h1>
					<h2 className="smaller-text">Likes</h2>
				</div>
				<div className="photos">
					<h1 className="bold-text">{props.photos}</h1>
					<h2 className="smaller-text">Photos</h2>
				</div>
			</div> */}
		</div>
	);
}

export default ProfileCard;