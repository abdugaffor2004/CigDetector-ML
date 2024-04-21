import { Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from './pieces/HomePage';
import ResultPage from './pieces/ResultPage';
import { useSelector } from 'react-redux';
import Header from './pieces/Header';




function App() {
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/result' element={<ResultPage/>}/>
      </Routes>
    </div>
  )
}

export default App
