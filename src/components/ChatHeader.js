const ChatHeader = ({user}) => {
   


	return (
	  <div className="chat-container-header">
		<div className="profile">
		  <div className="img-container">
		   <img src={user.url} alt={'photo of'+ user.first.name} />
		  </div>
		  <h3>{user.first_name}</h3>
		</div>
         <button className='logout-btn' onClick={handleClick}>LOG OUT</button>
		</div>
	)
}

export default ChatHeader
