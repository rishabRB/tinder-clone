import { useState } from "react"
import axios from 'axios'
const ChatInput = ({user,clickedUser}) => {
	const [textArea, setTextArea] = useState("")

	const from_userId = user?.user_id
	const to_userId = clickedUser?.user_id
	
	var date = new Date()
	var month = date.getMonth()-1
	var currentDate = date.getDate()
	var year = date.getFullYear()

	var timestamp = `${currentDate}-${month}-${year}`

    // add two numbers
	const add = (a, b) => a + b



	const addMessage=()=>{
      try{
		axios.post('http://localhost:8000/users/message',{
			from_userId,
			to_userId,
			message:textArea,
			timestamp
		})

		setTextArea("")
	  }
	  catch(err){
		console.log(err)
	  }
	}
	


	return (
	 <div className="chat-input">
		 <textarea value={textArea} placeholder="Message....." onChange={(e)=>setTextArea(e.target.value)} />	
		 <button className='secondary-button' onClick={()=>addMessage()}>Send</button>
	 </div>
	
	)
}

export default ChatInput
