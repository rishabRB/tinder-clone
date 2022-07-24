import NavBar from "../components/NavBar"
import AuthModal from "../components/AuthModal"
import { useState } from "react"

const Home = () => {

    const [showModal, setshowModal] = useState(false)
	const [isSignUp,setIsSignUp] = useState(true)
    const authToken=false
   
	const handleClick =()=>{
	 setshowModal(true)
	 setIsSignUp(true)
	}

	return (
	<div className="overlay">
	 <NavBar minimal={false} authToken={authToken} setshowModal={setshowModal} showModal={showModal} setIsSignUp={setIsSignUp}/>
	 <div className="home">
	   <h1 className="primary-title">Start Something epic </h1>
		 <button className="primary-button" onClick={handleClick}> {authToken ? "signout" : "create Account"} </button>
		 {showModal && <AuthModal setShowModal={setshowModal} isSignUp={isSignUp} />}
	 </div>
	</div>
	)
}

export default Home
