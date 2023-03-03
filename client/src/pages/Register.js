import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './pagesCss.css'
const Register = () => {
  const navigate = useNavigate()
  const [name,setName] = useState('')
  const [userName,setUserName] = useState('')
  const [email,setemail] = useState('')
  const [password,setPassword] = useState('')
  const [err, setErr] = useState(false)

  const registerUser = async()=>{
    const body = {
      name,
      userName,
      email,
      password
    }
    console.log("bodyyyy", body);
    try {
      const loginResponse = await fetch('http://localhost:5000/api/v1/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const content = await loginResponse.json();
      console.log("ress--", content)
      if(content.status==200){
        console.log("stststtsstttss")
        localStorage.setItem("userInfo",JSON.stringify(content.userLogin))
        console.log("stststtsstttss")
        navigate('/login')
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
              <p><b>Create account</b></p>
            </div>
            <div className='hadding'>
              <p>Let’s get to know you better!</p>
            </div>
            <div className='loginForm'>
              <div class="mb-3">
                <label  class="form-label">Your name</label>
                <input type="text" class="form-control" id="" placeholder="Type your name here" onChange={(e)=> setName(e.target.value) }/>
              </div>
              <div class="mb-3">
                <label  class="form-label">Username</label>
                <input type="text" class="form-control" id="" placeholder="Type your username here" onChange={(e)=> setUserName(e.target.value) }/>
              </div>
              <div class="mb-3">
                <label  class="form-label">Email</label>
                <input type="text" class="form-control" id="" placeholder="Type your email here" onChange={(e)=> setemail(e.target.value) }/>
              </div>
              <div class="mb-3">
                <label  class="form-label">Password</label>
                <input type="text" class="form-control" id="" placeholder="Type your password here" onChange={(e)=> setPassword(e.target.value) }/>
              </div>
              <div className='my-3'>
                <button className='btn btn-login w-100' onClick={registerUser}>Register</button>
              </div>
            </div>

        </div>
      </div>
    </div>
  )
}

export default Register
