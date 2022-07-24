import android from "../imges/03aed264f8539c570e9bc80ba6b60d92.webp"
import ios from "../imges/d256a5b510a685030be375c63a9010e9.webp"
import axios from 'axios'
import {useCookies} from 'react-cookie'
import { useState } from "react"
import {useNavigate} from "react-router-dom"


const AuthModal = ({setShowModal,isSignUp}) => {
	const [Email, setEmail] = useState(null)
	const [password, setPassword] = useState(null)
	const [confirmPassword, setconfirmPassword] = useState(null)
    const [error, setError] = useState(null)
	const [cookies,setCookie,removeCookie] = useCookies()
	const navigate = useNavigate()
	const handleClick=()=>{
	  setShowModal(false)
	}

	const handleSubmit=async(e)=>{
	 e.preventDefault()
		try{
	      if( isSignUp &&	password !== confirmPassword) {
				setError('Password not match')
			    setTimeout(()=>setError(null),2000)
			    return 
		}
				
			const response=await axios.post(`http://localhost:8000/sign/${isSignUp ? 'signup' : 'login'}`,{
				Email,
				password
			})
            

     
			setCookie('Email',response.data.Email)
			setCookie('AuthToken',response.data.AuthToken)
			setCookie('userID',response.data.userId)
		

			const success = response.status === 201

			if(success && isSignUp) navigate('/onboarding')
			if(success && !isSignUp) navigate('/dashboard')

			window.location.reload()

			

		}
		catch(error){
			if(error && isSignUp)
			setError('User already exits! Please Log in')

			if(error && !isSignUp)
			setError('Invalid credentials')
		}
	}


	return (
	  <div className="auth-modal">
		  <div  className="close-icon" onClick={handleClick}>X</div>
		  <h2>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
		  { error ?  <span className="error">{error}</span>  : " "  }
		  <form onSubmit={handleSubmit}>
			  <input 
			  type='email'
			  id='email'
			  name="email"
			  placeholder="Email"
			  required={true}
			  onChange={(e)=> setEmail(e.target.value)}
			  />
			  <input 
			  type='password'
			  id='password'
			  name="password"
			  placeholder="Password"
			  required={true}
			  onChange={(e)=> setPassword(e.target.value)}
			  />

			  {isSignUp && <input 
			  type='password'
			  id='confirm-password'
			  name="confirm-password"
			  placeholder="Confirm password"
			  required={true}
			  onChange={(e)=> setconfirmPassword(e.target.value)}
			  />
			  }

			  <p>By clicking Log in, you agree to our terms. Learn ow we process you data in our Privacy Policy</p>
			  <input className="secondary-button"  type="submit" value="Log In"/>
		  </form>

			  <hr />

			  <h2>GET THE APP </h2>

			  <div className="app-logo-container">
				  <div className="logo">
					  <img alt="ios-logo" src={ios} />	
				  </div> 
				  <div className="logo">
					  <img alt="android-logo" src={android} />	
				  </div>
			  </div>

	  </div>
	)
}

export default AuthModal
