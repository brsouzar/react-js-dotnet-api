import {React, useState } from 'react';
import { useNavigate } from 'react-router-dom'

import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.svg'; 
import padlock from '../../assets/padlock.png'; 

export default function Login() {
  const [userName, setUserName] = useState("");  
  const [passWord, setPassWord] = useState("");

  const navigate = useNavigate();
 
   async function login(e) {
    e.preventDefault();

    const data = {
      userName,
      passWord
    };
    try {
       const response = await api.post('api/auth/v1/signin', data);

       localStorage.setItem('userName', userName);
       localStorage.setItem('accessToken', response.data.accessToken);
       localStorage.setItem('refreshToken', response.data.refreshToken);

       navigate('/book');
    
    } catch (erro) {
      alert('Login faield, try again');
    } 
  }

  return (
    <div className='login-container'>     
      <section className="form">
          <img src={logo} alt='Erudio Logo'/>
          <form onSubmit={login}>
              <h1>Acces your Account</h1>
              <input 
                placeholder='Username' 
                value={userName}
                onChange={e => setUserName(e.target.value)}
              />
              <input 
                 type='password' 
                 placeholder='Password'
                 value={passWord}
                 onChange={e => setPassWord(e.target.value)}
              />

              <button className='button' type='submit'>Login</button>
          </form>
      </section>
      <img src={padlock} alt='Login'/>
    </div>
  );
} 