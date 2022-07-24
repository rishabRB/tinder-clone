import TinderCard from 'react-tinder-card'
import { useEffect, useState } from 'react'
import ChatContainer from '../components/ChatContainer'
import axios from 'axios'
import {useCookies} from 'react-cookie'
const Dashboard = () => {

    const [user, setUser] = useState(null)
    const [genderedUsers,setGenderedUser]=useState(null)
    const [lastDirection, setLastDirection] = useState()
	  const [cookies,setCookie,removeCookie] = useCookies(['user'])
   	const userId=cookies.userID

    const getUser=async()=>{
	  try{
	    const response = await axios.get('http://localhost:8000/users/user',{
		  params:{userId}
		})
	    setUser(response.data)
	  }
	  catch(err){
	    console.log(err)
	  }
	}

  const getGenderedUser= async()=>{
    try{
      const response=await axios.get('http://localhost:8000/users/gendered_user',{
        params:{gender:user?.gender_interest}
      })
      setGenderedUser(response.data)
    }
    catch(error){
      console.log(error)
    }
  }


  useEffect(()=>{
    getUser()
  },[])


	useEffect(()=>{
  if(user) getGenderedUser()
	},[user])


  const updateUserMatch=async(swipedUserId)=>{
    try{
      await axios.put('http://localhost:8000/users/addmatch',{
        userId,
        matchUserId:swipedUserId
      })

      getUser()
    }
    catch(err){
      console.log(err)
    }
  }
  

 
  const swiped = (direction, swipedUserId) => {
      if(direction === 'right'){
        updateUserMatch(swipedUserId)
      }
      setLastDirection(direction)
  } 

  const matchedUserIds=user?.matches.map(({user_id})=>user_id).concat(userId)

  const filteredUserIds=genderedUsers?.filter(
    genderedUser=> !matchedUserIds.includes(genderedUser.user_id)
    )



  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }


	return (	 
    <>
    {user &&
		<div className="dashboard">
		  <ChatContainer user={user} />
			<div className="swipe-container">
			<div className="card-container">
	        {filteredUserIds?.map((character) =>
          <TinderCard 
			className='swipe' 
			key={character.user_id} 
			onSwipe={(dir) => swiped(dir, character.user_id)} 
			onCardLeftScreen={() => outOfFrame(character.first_name)}>

            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        )}
			<div className="swipe-info">
			 {lastDirection && <p>You swiped {lastDirection} </p> }
			</div>
			</div>
			</div>

		</div>
    }
    </>
	)
}

export default Dashboard
