import React, { useContext } from "react"
import { UserContext } from "../providers/UserProvider"
import {auth} from "../config/fire"

const ProfilePage = () => {
  	const user = useContext(UserContext)
  	const {displayName, email} = user
  
  	return (
		<div>
			<div>
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