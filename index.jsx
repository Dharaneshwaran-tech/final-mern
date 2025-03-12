import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';

// Navbar Component
const Navbar = () => {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
      <Link to="/create-campaign">Create Campaign</Link>
    </nav>
  );
};

// Home Component
const Home = () => {
  const [campaigns, setCampaigns] = useState([
    { id: 1, title: 'Campaign 1', description: 'Help us build the future!', goal: 10000, raised: 5000 },
    { id: 2, title: 'Campaign 2', description: 'Support our new product launch!', goal: 20000, raised: 10000 },
  ]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Ongoing Campaigns</h1>
      {campaigns.map(campaign => (
        <div key={campaign.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <h2>{campaign.title}</h2>
          <p>{campaign.description}</p>
          <p>Goal: ${campaign.goal}</p>
          <p>Raised: ${campaign.raised}</p>
          <Link to={`/campaign/${campaign.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

// CampaignDetail Component
const CampaignDetail = () => {
  const { id } = useParams();
  const campaign = {
    1: { title: 'Campaign 1', description: 'Help us build the future!', goal: 10000, raised: 5000 },
    2: { title: 'Campaign 2', description: 'Support our new product launch!', goal: 20000, raised: 10000 },
  }[id];

  if (!campaign) {
    return <div>Campaign not found!</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{campaign.title}</h1>
      <p>{campaign.description}</p>
      <p>Goal: ${campaign.goal}</p>
      <p>Raised: ${campaign.raised}</p>
      <button onClick={() => alert('Thank you for your contribution!')}>Contribute</button>
    </div>
  );
};

// CreateCampaign Component
const CreateCampaign = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Campaign "${title}" created successfully!`);
    // Here you would typically send the data to your backend API
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Create a New Campaign</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Goal ($):</label>
          <input
            type="number"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Campaign</button>
      </form>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaign/:id" element={<CampaignDetail />} />
        <Route path="/create-campaign" element={<CreateCampaign />} />
      </Routes>
    </Router>
  );
};

export default App;