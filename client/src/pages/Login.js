import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './pagesCss.css'
const Login = () => {
  const navigate = useNavigate()
  const [userName,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [err,setErr] = useState(false)

  const userLogin = async()=>{
    const body = {
      userName,
      password
    }
    try {
      const loginResponse = await fetch('http://localhost:5000/api/v1/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const content = await loginResponse.json();
      console.log(content.status)
      if(content.status==200){
        console.log(content.userLogin)
        localStorage.setItem("userInfo",JSON.stringify(content.userLogin))
        navigate('/mygames')
      }else{
        setErr(true)
      }
    } catch (error) {
      if(error){
        setErr(true)
      }
    }
  }
  return (
    <div className='container'>
      <div className='row d-flex justify-content-center'>
        <div className='col-md-4 border .bg-body'>
            <div className='logHead'>
              <Link className='logHead' to={'/'} style={{textDecoration:"none", color:"black",}} ><h3><i class="bi bi-chevron-left"></i></h3></Link>
            </div>
            <div className='logHead'>
              <p><b>Login</b></p>
            </div>
            <div className='hadding'>
              <p>Please enter your details</p>
            </div>
            <div className='loginForm'>
              <div class="mb-3">
                <label  class="form-label">Username</label>
                <input type="text" class="form-control" id="" placeholder="Type your username here" onChange={(e)=>setUserName(e.target.value)}/>
              </div>
              <div class="mb-3">
                <label  class="form-label">Password</label>
                <input type="text" class="form-control" id="" placeholder="Type your password here" onChange={(e)=>setPassword(e.target.value)}/>
              </div>
             {
              err ? (
              <div>
                <div className='notify d-flex justify-content-center' style={{background: "#EB5757", display:"none"}}>
                    <p>Enter correct details.</p>
                </div>
                <div className='mb-3'>
                  <button className='btn btn-login w-100' onClick={userLogin}>Login</button>
                </div>
              </div>
              ):(
              <div className='mgn-20'>
                <button className='btn btn-login w-100' onClick={userLogin}>Login</button>
              </div>
              )
             }
            </div>

        </div>
      </div>
    </div>
  )
}

export default Login
