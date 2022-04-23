import ChatHeader from "./ChatHeader"
import MatchDisplay from "./MatchDisplay"
import ChatDisplay from "./ChatDisplay"

const ChatContainer = ({user}) => {
	return( 
	    <div className="chat-container">
			<ChatHeader user={user} />
		  <div className="button-container">
		   <button className="options">Matches</button>
		   <button className="options">Chat</button>
		  </div>
			<MatchDisplay />

			<ChatDisplay />
		</div>
	)
}

export default ChatContainer
