import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaPencilAlt, FaRegUser } from 'react-icons/fa';
import { FaPhoneFlip } from 'react-icons/fa6';
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLock2Fill } from 'react-icons/ri';
import { Link, Navigate } from 'react-router-dom';
import { Context } from '../../main';
import Loader from '../Loader/Loader';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when registration starts

    try {
      const response = await fetch('https://job-seeking-backend-yu44.onrender.com/api/v1/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include credentials such as cookies
        body: JSON.stringify({ name, phone, email, role, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setName('');
        setEmail('');
        setPassword('');
        setPhone('');
        setRole('');
        setIsAuthorized(true);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false); // Set loading to false when registration is complete
    }
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <section className="authPage">
      <div className="container">
        <div className="header">
          <img src="/JobZeelogo.png" alt="logo" />
          <h3>Create a new account</h3>
        </div>
        <form>
          <div className="inputTag">
            <label>Register As</label>
            <div>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              <FaRegUser />
            </div>
          </div>
          <div className="inputTag">
            <label>Name</label>
            <div>
              <input
                type="text"
                placeholder="Syed"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FaPencilAlt />
            </div>
          </div>
          <div className="inputTag">
            <label>Email Address</label>
            <div>
              <input
                type="email"
                placeholder="zk@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MdOutlineMailOutline />
            </div>
          </div>
          <div className="inputTag">
            <label>Phone Number</label>
            <div>
              <input
                type="number"
                placeholder="12345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <FaPhoneFlip />
            </div>
          </div>
          <div className="inputTag">
            <label>Password</label>
            <div>
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <RiLock2Fill />
            </div>
          </div>
          <button type="submit" onClick={handleRegister} disabled={isLoading}>
            {isLoading ? <Loader /> : 'Register'}
          </button>
          <Link to="/login">Login Now</Link>
        </form>
      </div>
      <div className="banner">
        <img src="/register.png" alt="login" />
      </div>
    </section>
  );
};

export default Register;
