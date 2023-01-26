import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
// import { FcGoogle } from 'react-icons/fc';
import jwt_decode from 'jwt-decode';
import background from '../assests/background.mp4'
import logoblack from '../assests/logoblack.png'
import '../index.css'
import {client} from '../Client';


const Login = () => {
  const navigate = useNavigate()

  const responseGoogle = (response) => {
    if (response) {
      const crd = response.credential;
      const decode = jwt_decode(crd);
      localStorage.setItem('user',JSON.stringify(decode));
      // const userinfo={uname:decode.name,sub:decode.sub,image:decode.picture};
      const { name, sub, picture } = decode;
      const userinfo = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture,
      }
      
      client.createIfNotExists(userinfo)
      .then(()=>{
        navigate('/',{replace:true})
      })
    }

    else {
      alert("Login failed")
    }
  }

  return (
    <>
      {/* <div className='flexme'>
        Login
      </div> */}
      <div className='backgroundV'>
        <video className='bgvideo h-screnn' src={background}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
        />
      </div>
      <div className='overlay flexme'>
        <div className=''>
          <img src={logoblack} width="240px" alt='logo' />
        </div>
        <div className='bg-transparent m-4'>
          <GoogleLogin
            className='bg-transparent'
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
          />
        </div>
      </div>

    </>
  )
}

export default Login;