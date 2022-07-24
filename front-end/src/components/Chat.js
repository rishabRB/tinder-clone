const Chat = ({descendingOrderMessage}) => {
	return (
	  <>
		  <div className="chat-display">
			{descendingOrderMessage?.map((message,_index)=>(
				<div className='chat-display-wrapper' key={_index}>
					<div className = 'chat-message-header'>
						<div className = 'img-container'>
							<img src={message.img} />
						</div>
						<span>{message.name}</span>
					</div>
					<p>{message.message}</p>
				</div>
			))}
		  </div>
	  </>
	)
}

export default Chat
