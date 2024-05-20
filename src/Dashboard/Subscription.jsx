import React from 'react';
import Navbar from "../Layouts/Navbar";  // Ensure these imports match your project structure
import Sidebar from "../Layouts/Sidebar";

// Subscription component displaying pricing plans
const Subscription = () => {
    const plans = [
        { type: 'Gold', cost: '$99', duration: 'Weekly Plan', features: ['Budget Tracking', 'Transaction Monitoring', 'Financial Reports', 'Alerts and Notifications'] },
        { type: 'Diamond', cost: '$199', duration: 'Monthly Plan', features: ['Advanced Budgeting Tools', 'Investment Tracking', 'Savings Goals', 'Credit Score Monitoring'] },
        { type: 'Platinum', cost: '$299', duration: 'Yearly Plan', features: ['Estate Planning', 'Personal Finance Coach', 'Exclusive Webinars and Events','Family Financial Management'] },
    ];

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', flexGrow: 1, flexWrap: 'wrap' }}>
            {plans.map(plan => (
                <div key={plan.type} style={{ margin: '10px', padding: '20px', borderRadius: '10px', backgroundColor: '#222', width: '250px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', color: 'white' }}>
                    <h2 style={{ textAlign: 'center' }}>{plan.type}</h2>
                    <p style={{ textAlign: 'center' }}>{plan.cost} - {plan.duration}</p>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {plan.features.map((feature, index) => <li key={index} style={{ marginBottom: '5px' }}>{feature}</li>)}
                    </ul>
                    <button style={{ backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', display: 'block', width: '100%', marginTop: '10px' }}>Choose Plan</button>
                </div>
            ))}
        </div>
    );
};

// Main App layout component
const Applayout = ({ sidebarState, setSidebarState }) => {
  return (
    <div className="main d-flex min-vh-100 flex-nowrap">
      <Sidebar
        activeItem={"dashboard"}
        sidebarState={sidebarState}
        setSidebarState={setSidebarState}
      />
      <main className="d-flex flex-column flex-grow-1 overflow-y-scroll">
        <Navbar />
        <Subscription />
      </main>
    </div>
  );
};

export default Applayout;
