import ChatHeader from "./ChatHeader"
import MatchDisplay from "./MatchDisplay"
import ChatDisplay from "./ChatDisplay"
import { useState } from "react"

const ChatContainer = ({user}) => {
	const [clickedUser,setClickedUser] = useState(null)
	console.log(clickedUser)
	return( 
	    <div className="chat-container">
			<ChatHeader user={user} />
		  <div className="button-container">
		   <button className="options" onClick={()=>setClickedUser(null)}>Matches</button>
		   <button className="options" disabled={clickedUser}>Chat</button>
		  </div>
			{!clickedUser && <MatchDisplay  matches={user.matches} setClickedUser = {setClickedUser}/> }

			{clickedUser && <ChatDisplay user={user} clickedUser={clickedUser} />}
		</div>
	)
}

export default ChatContainer
