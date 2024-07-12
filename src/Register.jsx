import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import './styles.css';
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate('/login');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true)

    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await fetch('https://timd-backend.onrender.com/api/v1/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
     console.log(response)
      if (!response.ok) {
        throw new Error('Failed to register');
      }

      const data = await response.json();
      alert(data.message || 'Successfully registered');
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      alert(error.message);
    }
    setIsLoading(false)

  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
      <button type="submit">{isLoading ? <Loader/> : 'Register'}</button>
      <button type="button" onClick={handleRegisterClick}>Login</button>
    </form>
  );
};

export default Register;
