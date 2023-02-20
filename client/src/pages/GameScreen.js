import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'
import './pagesCss.css'

const GameScreen = () => {
  const {id} = useParams()
  const [games, setGames] = useState()
  const [user, setUser] = useState({});
  const [flag, setFlag] = useState(false);
  // console.log(id)
  // console.log(user);
  const getGameData = async()=>{
    setFlag(false);
    const res = await axios.get(`http://localhost:5000/api/v1/getgame/${id}`);
    console.log(res.data);
    setGames(res.data);
    setFlag(true);
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userInfo")))
    getGameData();
  }, []);
    
    
  // console.log(games)
  return (
    <>
      {flag ? <div className='container'>
        <div className='row d-flex justify-content-center'>
          <div className='col-md-4 border .bg-body'>
              <div className='logHead pt-2'>
                <Link className='logHead' to={'/mygames'} style={{textDecoration:"none", color:"black",}} ><h3><i class="bi bi-chevron-left"></i></h3></Link>
              </div>
              <div className='hadding'>
              {console.log(games.player2)}
                <p>Game with {games.player1_Id== user._id ? games.player2 : games.player1}</p>
              </div>
              <div className='logHead'>
                <p><b>Your piece</b></p>
              </div>
              <div className='piece ps-2 '>
                  <h1>X</h1>
              </div>
              <div className='row pt-2' style={{background:"#FFE79E",margin:"auto"}}>
                  <p>{games.status =="running"? (games.lastMove == user._id ? "Their move": "Your move") : (games.winner == "draw" ? "It’s a Draw!" : games.winner == user._id ? "You win":"You Lose")  }</p>
              </div>
              <div className='grid-box'>
                  <div className='grid-item piece d-flex justify-content-center' onClick={(e)=>{ }}>
                      <h1>{games.moves.place1? ( user._id == games.moves.place1? "X":"O" ):""}</h1>
                  </div>
                  <div className='grid-item piece d-flex justify-content-center'>
                      <h1>{games.moves.place2? ( user._id == games.moves.place2? "X":"O" ):""}</h1>
                  </div>
                  <div className='grid-item piece d-flex justify-content-center'>
                      <h1>{games.moves.place3? ( user._id == games.moves.place3? "X":"O" ):""}</h1>
                  </div>
                  <div className='grid-item piece d-flex justify-content-center'>
                      <h1>{games.moves.place4? ( user._id == games.moves.place4? "X":"O" ):""}</h1>
                  </div>
                  <div className='grid-item piece d-flex justify-content-center'>
                      <h1>{games.moves.place5? ( user._id == games.moves.place5? "X":"O" ):""}</h1>
                  </div>
                  <div className='grid-item piece d-flex justify-content-center'>
                      <h1>{games.moves.place6? ( user._id == games.moves.place6? "X":"O" ):""}</h1>
                  </div>
                  <div className='grid-item piece d-flex justify-content-center'>
                      <h1>{games.moves.place7? ( user._id == games.moves.place7? "X":"O" ):""}</h1>
                  </div>
                  <div className='grid-item piece d-flex justify-content-center'>
                      <h1>{games.moves.place8? ( user._id == games.moves.place8? "X":"O" ):""}</h1>
                  </div>
                  <div className='grid-item piece d-flex justify-content-center'>
                      <h1>{games.moves.place9? ( user._id == games.moves.place9? "X":"O" ):""}</h1>
                  </div>
              </div>
              <div className='my-3 mt-5'>
                  <button className='btn btn-login w-100'>{games.status=="running"? games.lastMove == user._id ? "Waiting for Harsh":"submit" : "Start another game"}</button>
              </div>

          </div>
        </div>
      </div> : null}


    </>

  )
}

export default GameScreen
