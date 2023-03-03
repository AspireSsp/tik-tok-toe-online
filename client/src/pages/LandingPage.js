import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './pagesCss.css'
const LandingPage = (props) => {
  const navigate = useNavigate()
  console.log("p-->", props.userInfo);
useEffect(()=>{
  checkUser();
},[]);

  const checkUser = ()=>{
    if(props.userInfo){
      console.log("kkkkkkkkkkkk")
      navigate("/mygames");
    }
  }
  const gotoLogin = ()=>{
    navigate('/login')
  }
  const gotoRegister = ()=>{
    navigate('/register')
  }
  return (
    <div className='container'>
      <div className='row d-flex justify-content-center'>
        <div className='col-md-4 border .bg-body'>
            <div className='font-bilbo'>
                <p className='app-name' style={{fontSize:"36px"}}>async</p>
                <p className='app-name'>tic tac</p>
                <p className='app-name'>toe</p>
            </div>
            <div className='my-3'>
                <button className='btn btn-login w-100' onClick={gotoLogin}>Login</button>
            </div>
            <div className='my-3'>
                <button className='btn btn-register w-100' onClick={gotoRegister}>Register</button>
            </div>

        </div>
      </div>
    </div>
  )
}

export default LandingPage
