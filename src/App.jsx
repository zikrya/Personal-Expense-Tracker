import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import AuthContextProvider from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/Register';
import TransTable from './pages/TransTable';

function App() {

  return (
    <AuthContextProvider>
    <div>
    <Router>
          <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/transtable" element={<TransTable/>} /> 
          </Routes>
        </Router>
    </div>
    </AuthContextProvider>
  )
}

export default App
