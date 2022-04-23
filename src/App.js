import Home from "./pages/home"
import Dashboard from "./pages/Dashboard"
import Onboarding from "./pages/onboarding"
import { BrowserRouter , Routes, Route } from "react-router-dom"


function App() {



  return (
    <BrowserRouter>
	 <Routes>
	   <Route path={"/"} element={<Home />} />
	    <Route path={"/dashboard"} element={<Dashboard />} /> 
	    <Route path={"/onboarding"} element={<Onboarding />} />
	 </Routes>  
	</BrowserRouter>
  );
}

export default App;
