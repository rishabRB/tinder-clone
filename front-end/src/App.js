import Home from "./pages/home"
import Dashboard from "./pages/Dashboard"
import Onboarding from "./pages/onboarding"
import { BrowserRouter , Routes, Route } from "react-router-dom"
import { useCookies } from "react-cookie"

function App() {

	const [cookies,setCookies,removeCookies] = useCookies(['user'])
    const authToken = cookies.AuthToken
	console.log(authToken)

  return (
    <BrowserRouter>
	 <Routes>
	   <Route path={"/"} element={<Home />} />
	    {authToken && <Route path={"/dashboard"} element={<Dashboard />} /> }
	    {authToken && <Route path={"/onboarding"} element={<Onboarding />} />}
	 </Routes>  
	</BrowserRouter>
  );
}

export default App;
