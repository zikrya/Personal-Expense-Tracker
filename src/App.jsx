import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';

function App() {

  return (
    <>
    <p className='text-4xl'>Personal Expense Tracker</p>
    <div>
    <Router>
          <Routes>
          <Route exact path="/" element={<Home/>} />
          </Routes>
        </Router>
    </div>
    </>
  )
}

export default App
