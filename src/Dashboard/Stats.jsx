import React from 'react';
import Navbar from "../Layouts/Navbar";
import Sidebar from "../Layouts/Sidebar";
import '../css/Dashboard.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const position = [33.533320677859734, -5.122345938054433]; // Replace with your desired coordinates

const Stats = ({ sidebarState, setSidebarState }) => {
  return (
    <div className="main d-flex min-vh-100 flex-nowrap">
    <Sidebar activeItem={'stats'} sidebarState={sidebarState} setSidebarState={setSidebarState}/>
    <main className="d-flex flex-column flex-grow-1 overflow-y-scroll">
        <Navbar />
        <div className="bg-white flex-grow-1">
            <div className="px-lg-5 py-lg-3 p-2"></div>
        </div>
        <MapContainer center={position} zoom={13} style={{ height: '110%', width: '100%'}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup> 
        </Popup>
      </Marker>
    </MapContainer>
    </main>
  </div>
  );
};

export default Stats;
