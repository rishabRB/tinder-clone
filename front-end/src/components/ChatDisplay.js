import {useEffect, useState} from 'react'
import axios from 'axios'
import Chat from '../components/Chat'
import ChatInput from '../components/ChatInput'
const ChatDisplay = ({user,clickedUser}) => {

	const userId = user?.user_id
	const crosspondingUserId = clickedUser?.user_id
	const [userMessages , setUserMessages] = useState(null)
	const [clickedUserMessage,setClickedUserMessage] = useState(null)

	const getUserMessages = async ()=>{
		try{
			const response = await axios.get('http://localhost:8000/users/messages',{
				params:{userId:userId,crosspondingUserId:crosspondingUserId}
			})
			setUserMessages(response.data)
		}
		catch(err){
			console.log(err)
		}
	}

	const getClickedUserMessages = async (senderId,recipientsId)=>{
		try{
			const response = await axios.get('http://localhost:8000/users/messages',{
				params:{userId:crosspondingUserId,crosspondingUserId:userId}
			})
			setClickedUserMessage(response.data)
		}
		catch(err){
			console.log(err)
		}

	}


    useEffect(()=>{
		getUserMessages()
		getClickedUserMessages()
	},[])

	const messages = []

	userMessages?.forEach(message => {
		const formattedMessages = {
	        name:user?.first_name,
			img:user?.url,
			message:message.message,
			timestamp:message.timestamp 
		}
		messages.push(formattedMessages)
	})

clickedUserMessage?.forEach(message=>{
	const formattedMessage={
		name:clickedUser?.first_name,
		img:clickedUser?.url,
		message:message.message,
		timestamp:message.timestamp
	}
	messages.push(formattedMessage)
})

const descendingOrderMessage = messages?.sort((a,b)=> b.timestamp - a.timestamp)

	return (
	  <>	
	  <Chat descendingOrderMessage = {descendingOrderMessage}/>
	  <ChatInput user={user} clickedUser={clickedUser}/>
	  </>
	)
}

export default ChatDisplay
