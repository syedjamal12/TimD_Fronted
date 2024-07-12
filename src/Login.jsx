import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import './styles.css';

const Login = ({ setLoggedIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };
  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    try {
      const response = await axios.post('https://timd-backend.onrender.com/api/v1/user/login', formData);
      // alert(response.data.message);
      setLoggedIn(true);
      navigate('/dashboard');
    } catch (error) {
      alert(error.response.data.message);
    }
    setIsLoading(false)
  };

  return (
    <form onSubmit={handleSubmit}>
    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
    <button type="submit">{isLoading ? <Loader/> : 'Login'}</button>
    <button type="button" onClick={handleRegisterClick}>Register</button>
  </form>
  );
};

export default Login;
