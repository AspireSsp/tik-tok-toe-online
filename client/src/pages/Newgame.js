import React, { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './pagesCss.css'

const Newgame = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({});
  const [email, setEmail] = useState('');

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('userInfo')));
  }, []);

  const startNewgame = async()=>{
    try {
      const loginResponse = await fetch('http://localhost:5000/api/v1/newgame', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email,userId:user._id})
      });
      const content = await loginResponse.json();
      console.log("content", content)
      if(content){
        console.log(content)
        navigate(`/gameScreen/${content.newGame._id}`)
      }else{
        // setErr(true)
      }
    } catch (error) {
      if(error){
        // setErr(true)
      }
    }
  }
  return (
    <div className='container'>
      <div className='row d-flex justify-content-center'>
        <div className='col-md-4 border .bg-body'>
            <div className='logHead pt-2'>
              <Link className='logHead' to={'/mygames'} style={{textDecoration:"none", color:"black",}} ><h3><i class="bi bi-chevron-left"></i></h3></Link>
            </div>
            <div className='logHead'>
              <p><b>Start a new game</b></p>
            </div>
            <div className='hadding'>
              <p>Whom do you want to play with?</p>
            </div>
            <div className='loginForm'>
              <div class="mb-3 pt-2">
                <label  class="form-label">Email</label>
                <input type="text" class="form-control" id="" placeholder="Type your email here" onChange={(e)=>{setEmail(e.target.value)}}/>
              </div>
              <div className='mgn-20' style={{marginTop:"80%"}}>
                <button className='btn btn-login w-100' onClick={startNewgame}>Start game</button>
              </div>
            </div>

        </div>
      </div>
    </div>
  )
}

export default Newgame
