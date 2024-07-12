import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
const PropertyList = () => {
  const [properties, setPropertiesState] = useState([]);
  const [editPropertyId, setEditPropertyId] = useState(null); // State to hold the property ID being edited
  const [updatedProperty, setUpdatedProperty] = useState({
    Name: '',
    description: '',
    address: '',
    Number: '',
    Image: null // Assuming you want to update the image as well
  });

  const navigate = useNavigate(); // Use useNavigate at the top level of the component

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('https://timd-backend.onrender.com/api/v1/job/getall');
      setPropertiesState(response.data.jobs);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleEdit = (property) => {
    setEditPropertyId(property._id);
    setUpdatedProperty({
      Name: property.Name,
      description: property.description,
      address: property.address,
      Number: property.Number,
      Image: null // Reset image selection for editing
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('Name', updatedProperty.Name);
      formData.append('description', updatedProperty.description);
      formData.append('address', updatedProperty.address);
      formData.append('Number', updatedProperty.Number);
      if (updatedProperty.Image) {
        formData.append('Image', updatedProperty.Image);
      }

      await axios.put(`https://timd-backend.onrender.com/api/v1/job/update/${editPropertyId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setEditPropertyId(null); // Clear edit state after successful update
      alert('Property updated successfully.');
      fetchProperties(); // Refresh the properties list
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating property:', error);
      alert('Failed to update property. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditPropertyId(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://timd-backend.onrender.com/api/v1/job/delete/${id}`);
      alert(response.data.message);
      fetchProperties(); // Refresh the properties list after deletion
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'Image') {
      setUpdatedProperty({ ...updatedProperty, [name]: files[0] });
    } else {
      setUpdatedProperty({ ...updatedProperty, [name]: value });
    }
  };

  return (
    <div>
    <h2>Properties</h2>
    <button onClick={fetchProperties()}></button>
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {properties.map((property) => (
          <tr key={property._id}>
            <td>
              <img src={property.Image.url} alt={property.Name} />
            </td>
            <td>{property.Name}</td>
            <td>{property.description}</td>
            <td>{property.address}</td>
            <td>{property.Number}</td>
            <td className="actions">
              {editPropertyId === property._id ? (
                <div>
                  <button className="edit-button" onClick={handleUpdate}>Update</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              ) : (
                <div>
                  <button className="edit-button" onClick={() => handleEdit(property)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(property._id)}>Delete</button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {editPropertyId && (
      <form onSubmit={handleUpdate}>
        <input type="text" name="Name" placeholder="Property Name" value={updatedProperty.Name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={updatedProperty.description} onChange={handleChange} required></textarea>
        <input type="text" name="address" placeholder="Address" value={updatedProperty.address} onChange={handleChange} required />
        <input type="text" name="Number" placeholder="Phone" value={updatedProperty.Number} onChange={handleChange} required />
        
        <input type="file" name="Image" onChange={handleChange} />
        <button type="submit">Update Property</button>
      </form>
    )}
  </div>
  );
};

export default PropertyList;
