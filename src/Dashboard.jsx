import React, { useState } from 'react';
import CreateProperty from './CreateProperty';
import PropertyList from './PropertyList.jsx';
import './styles.css'; // Import the CSS file

const Dashboard = () => {
  const [properties, setProperties] = useState([]);

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard</h1>
      <CreateProperty setProperties={setProperties} />
      <PropertyList properties={properties} setProperties={setProperties} />
    </div>
  );
};

export default Dashboard;
