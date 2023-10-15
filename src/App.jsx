import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import AuthContextProvider from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './components/NavBar';

function App() {

  return (
    <AuthContextProvider>
    
    <div>
    <Router>
    <NavBar />
          <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
          </Routes>
    </Router>
    </div>
    </AuthContextProvider>
  )
}

export default App
