import colorLogo from "../imges/Tinder-Logo.png"
import smallLogo from "../imges/tinder-1-logo-black-and-white.png"

const NavBar = ({minimal,authToken,showModal,setshowModal,setIsSignUp}) => {

	const handleClick=()=>{
      setshowModal(true)
	  setIsSignUp(false)
	}
	return (
		<nav>
		<div className="logo-container">
			<img className="logo" alt ="tinder-logo" src={ minimal ? colorLogo : smallLogo} />
		</div>

		{!authToken && !minimal && <button className="nav-button"  disabled={showModal} onClick={handleClick}>Log in</button>}
		</nav>
	)
}

export default NavBar
