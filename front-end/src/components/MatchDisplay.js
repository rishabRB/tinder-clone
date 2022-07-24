import axios from 'axios'
import { useEffect, useState } from 'react'


const MatchDisplay = ({matches,setClickedUser}) => {
  
	const [matchedProfiles,setMatchedProfile] = useState(null)
	const matchUserIds = matches.map(({user_id}) => user_id)
	const getMatch = async ()=>{
		try{
			const response = await axios.get('http://localhost:8000/users/alluser',{
				params:{userIds:JSON.stringify(matchUserIds)}
			})
			setMatchedProfile(response.data)

		}
		catch(err){
			console.log(err)
		}
	}

	console.log(matchedProfiles)
	useEffect(()=>{
		getMatch()
	},[matches])

	return (
	  <div className="match-display">
		{matchedProfiles?.map((match,_index)=>(
			<div  key={{_index}} className='match-card' onClick={()=>setClickedUser(match)}>
				<div className='img-container'>
					<img src={match?.url} alt={match?.first_name + 'profile'} />
				</div>
				<h3>{match?.first_name}</h3>
			</div>
		))}
		</div>
)}

export default MatchDisplay
