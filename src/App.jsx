import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css'
import AuthContextProvider from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TransTable from './pages/TransTable';
// import DashboardCards from './pages/DashboardCards';
import NavBar from './components/NavBar';
import Profile from './pages/Profile';
import RegisterSurvery from './pages/RegisterSurvey';
import { gettingToken, requestPermission } from './utils/firebase-config';

function App() {
  const [isTokenFound, setTokenFound] = useState(false);
  gettingToken(setTokenFound);

  return (

    <AuthContextProvider>
      <div>
        <Router>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/transtable" element={<TransTable />} />
            <Route exact path="/profile" element={<Profile />} />
            {/* <Route exact path="/dashboard-card" element={<DashboardCards/>} /> */}
            {/* the above line is redundant but we may utilize later for component-based building. Do not delete files associated. */}
            <Route exact path="/register-survey" element={<RegisterSurvery />} />
          </Routes>
        </Router>
        {isTokenFound && <p> Notification permission enabled </p>}
        {!isTokenFound && <p> Need notification permission </p>}
        {requestPermission}
      </div>
    </AuthContextProvider>
  )
}

export default App
