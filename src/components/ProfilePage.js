import React, { useContext } from "react"
import { UserContext } from "../providers/UserProvider"
import {auth} from "../config/fire"

const ProfilePage = () => {
  	const user = useContext(UserContext)
  	const {photoURL, displayName, email} = user
  
  	return (
		<div>
			<div>
				<div
					style={{
						background: `url(${photoURL}) no-repeat center center`,
						backgroundSize: "cover",
						height: "200px",
						width: "200px"
					}}
					>
				</div>
				<div>
					<h2>{displayName}</h2>
					<h3>{email}</h3>
				</div>
			</div>
			<button onClick = {() => auth.signOut()}>Sign out</button>
		</div>
  	) 
}

export default ProfilePage