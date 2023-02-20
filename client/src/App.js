import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Yourgames from './pages/Yourgames';
import Newgame from './pages/Newgame';
import GameScreen from './pages/GameScreen';
import { useState } from 'react';
function App() {
  const [user] = useState(JSON.parse(localStorage.getItem('userInfo')));
  // console.log("app" , user)
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage userInfo={user} /> }></Route>
          <Route path='/login' element={<Login  userInfo={user} /> }></Route>
          <Route path='/register' element={<Register userInfo={user}  /> }></Route>
          <Route path='/mygames' element={<Yourgames userInfo={user}  /> }></Route>
          <Route path='/newgame' element={<Newgame userInfo={user} /> }></Route>
          <Route path='/gameScreen/:id' element={<GameScreen userInfo={user} /> }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
