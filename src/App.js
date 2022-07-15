import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const {authIsReady, user} = useAuthContext();
  return (
    <div className="App"> 
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
        
          {/* ---------------  CREATE ROUTES  -------------  */}
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate replace to ="/login" /> } />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate replace to="/" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate replace to="/" /> } />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;



// reference:
// <a
//   className="App-link"
//   href="https://reactjs.org"
//   target="_blank"
//   rel="noopener noreferrer"
// >
//   Learn React
// </a>