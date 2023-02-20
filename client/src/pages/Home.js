import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import './Home.css'
var moment = require('moment'); // require
moment().format(); 

const Home = (props) => {
  const navigate =  useNavigate()
  const viewGame = (id)=>{
    navigate(`/gameScreen/${id}`)
  }
  const newgame = ()=>{
    navigate('/newgame')
  }
  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className=" .bg-body">
            <h1 className="game">Your Games</h1>

            {
              props.games.map((ele)=>{
                const player1_Id = ele.player1_Id
                if(ele.status == "running"){
                  return(
                    <div class="card">
                      <div className="card-body">
                        <h1 id="boxHead">Game with {player1_Id==props.user._id ? ele.player2 : ele.player1}</h1>
                        <p className="boxP">
                          {ele.lastMove==props.user._id ? "You've made your move!": ele.player2+" just made their move!" }
                          <br />
                          {ele.lastMove==props.user._id ? "Waiting for them!": "It’s your turn to play now." }
                        </p>
                        <p className="boxDate">{moment(ele.updatedAt.valueOf()).format("Do MMMM YYYY, h:mm:ss a")}</p>
                      <button class="btn" id="boxBtn" onClick={()=>viewGame(ele._id)} > <span>View game</span> </button>
                      </div>
                    </div>
                  )
                }
                if(ele.status =="complete" && ele.winner == "draw"){
                  return(
                    <div class="card">
                      <div className="card-body">
                        <h1 id="boxHead">Game with {player1_Id==props.user._id ? ele.player2 : ele.player1}</h1>
                        <p className="boxP">
                          It's a Draw!
                        </p>
                        <p className="boxDate">{moment(ele.updatedAt.valueOf()).format("Do MMMM YYYY, h:mm:ss a")}</p>
                      <button class="btn" id="boxBtn" onClick={()=>viewGame(ele._id)}><span>View game</span></button>
                      </div>
                    </div>
                  )
                }else{
                  return(
                    <div class="card">
                      <div className="card-body">
                        <h1 id="boxHead">Game with {player1_Id==props.user._id ? ele.player2 : ele.player1}</h1>
                        <p className="boxP">
                          {props.user._id== ele.winner ? "You won!": "You lose!" }
                        </p>
                        <p className="boxDate">{moment(ele.updatedAt.valueOf()).format("Do MMMM YYYY, h:mm:ss a")}</p>
                      <button class="btn" id="boxBtn" onClick={()=>viewGame(ele._id)}><span>View game</span></button>
                      </div>
                    </div>
                  )
                }
              })
            }

            
              <div className=" newgameBtn">
                <button className="btn btnGame btnText" onClick={newgame}><span className=" fs-4">+</span>New Game</button>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
