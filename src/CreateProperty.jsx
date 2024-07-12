import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import './styles.css';
const CreateProperty = ({ setProperties }) => {
  const [Name, setFirstName] = useState("");
  const [description, setDes] = useState("");
  const [address, setaddress] = useState("");
  const [Number, setNumber] = useState("");
  const [Image, setimage] = useState(null);
  const [ImagePreview, setimagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);



  const navigate = useNavigate();

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setimagePreview(reader.result);
      setimage(file);
    };
  };

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("Name", Name);
      formData.append("description", description);
      formData.append("address", address);
      formData.append("Number", Number);
      formData.append("Image", Image);

      const response = await fetch('https://timd-backend.onrender.com/api/v1/job/postProperty', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        },
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        setProperties((prev) => [...prev, data.property]);
        alert("Property Created Successfully Please Refresh it");
        
        setFirstName("");
        setDes("");
        setaddress("");
        setNumber("");
        setimage(null);
        setimagePreview("");
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the property.');
    }
    setIsLoading(false)
  };

  return (
    <form onSubmit={handleSubmit}>
    <input type="text" name="name" placeholder="Property Name" value={Name} onChange={(e) => setFirstName(e.target.value)} required />
    <textarea name="description" placeholder="Description" value={description} onChange={(e) => setDes(e.target.value)} required></textarea>
    <input type="text" name="address" placeholder="Address" value={address} onChange={(e) => setaddress(e.target.value)} required />
    <input type="text" name="phone" placeholder="Phone" value={Number} onChange={(e) => setNumber(e.target.value)} required />
    <input type="file" onChange={handleAvatar} required />
    {ImagePreview && <img src={ImagePreview} alt="Property Preview" />}
    <button type="submit">{isLoading ? <Loader/> : 'Create Property'}</button>
  </form>
  );
};

export default CreateProperty;
