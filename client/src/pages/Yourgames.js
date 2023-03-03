import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Home from './Home';
import './pagesCss.css'

const Yourgames = (userInfo) => {
  const navigate = useNavigate()
  const [user] = useState(JSON.parse(localStorage.getItem('userInfo')));
  const [games , setGames] = useState();
  console.log(user);
// console.log()
  console.log(user._id)

      
  useEffect(() => {
    // setUser(JSON.parse(localStorage.getItem('userInfo')));
    getAllgames()
    }, []);

    const getAllgames = ()=>{
      try {
        fetch(`http://localhost:5000/api/v1/getallgames/${user._id}`)
        .then((response) => response.json())
        .then((data) => {console.log("mygames-->", data); setGames(data.reverse())} );
      } catch (error) {
          console.log(error)
      }
    }
    const newGame = ()=>{
      navigate('/newgame')
    }
    return (
    <div className='container'>
      <div className='row d-flex justify-content-center '>
        <div className={`col-md-4 .bg-body ${games ? "border" : ""}`}>
            {
              games ?
              games.length===0 ? (
                <div>
                <div className='hadding pt-4'>
                  <p>Your Games</p>
                </div>
                <div className='font-bilbo'>
                    <p className='app-name'>No Games</p>
                    <p className='app-name'>Found</p>
                </div>
                <div className='my-3'>
                    <button className='btn btn-login w-100' onClick={newGame}>Start a new game</button>
                </div>
                </div>
              ): (
                <div>
                  <Home games = {games} user={user} />
                </div>
              ) : (
                <div class="text-center">
                  <div class="spinner-border"  style={{width:"4rem",height:"4rem", marginTop:"30%"}} role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              )
            }
        </div>
      </div>
    </div>
  )
}

export default Yourgames
