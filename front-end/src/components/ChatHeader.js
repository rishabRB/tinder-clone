import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'

const ChatHeader = ({user}) => {

	const [cookies,setCookie,removeCookie] = useCookies(['user'])
	const navigate = useNavigate()
   
const handleClick=()=>{
	removeCookie('userID',cookies.userID)
	removeCookie('AuthToken',cookies.AuthToken)
	removeCookie('Email',cookies.Email)
	navigate('/')
	
}

	return (
	  <div className="chat-container-header">
		<div className="profile">
		  <div className="img-container">
		   <img src={user.url} alt={'photo of'+ user.first_name} />
		  </div>
		  <h3>{user.first_name}</h3>
		</div>
         <button className='logout-btn' onClick={handleClick}>LOG OUT</button>
		</div>
	)
}

export default ChatHeader
