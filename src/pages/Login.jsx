import React, { useState } from 'react'
import { useAuth } from '../auth/authContext'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, seterror] = useState('')

    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const res = await api.post('/auth/login',{email,password})
            login(res.data.token);
            navigate('/');
        }catch(err){
            seterror('Invalid Credentials')
        }
    };
  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login