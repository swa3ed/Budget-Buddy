import React from 'react';
import Navbar from "../Layouts/Navbar";
import Sidebar from "../Layouts/Sidebar";
import Linechart from '../Analytics/Linechart';
import Piechart from '../Analytics/Piechart';
import Vehiclecount from '../Analytics/Vehiclecount';
import ServiceList from '../Analytics/Servicelist';
import '../css/dashboard.css';
import car from "../Assets/svg/car.svg";
import semi from "../Assets/svg/semi.svg";
import suv from "../Assets/svg/suv.svg";
import truck from "../Assets/svg/truck.svg";

const dashboardServices = [
  {
    ID: '1',
    date: '2022-10-01',
    maintenance: 'Oil Change',
    vehiculeId: 'ABC123',
    status: 'Done'
  },
  {
    ID: 2,
    date: '2022-10-02',
    mintenance: 'Semi',
    vehiculeId: 'DEF456',
    status: 'In_process'
  },
  {
    ID: 3,
    date: '2022-10-03',
    maintenance: 'SUV',
    vehiculeId: 'GHI789',
    status: 'Not_started'
  },
  // Add more objects as needed
];
const Dashboard = ({ sidebarState, setSidebarState }) => {
  return (
    <div className="main d-flex min-vh-100 flex-nowrap">
    <Sidebar activeItem={'dashboard'} sidebarState={sidebarState} setSidebarState={setSidebarState}/>
    <main className="d-flex flex-column flex-grow-1 overflow-y-scroll">
        <Navbar />
        <div className="bg-white flex-grow-1">
            <div className="px-lg-5 py-lg-3 p-2">
                                      {/* States / Data */}
                                      <div className="card border-0 shadow-sm mb-4 rounded-4 p-2">
                            <div className="card-body">
                                <div className="row justify-content-around flex-wrap">
                                    <div className="col-lg-3">
                                        <div className="d-flex align-items-center gap-3 flex-wrap">
                                            <div className="p-4">
                                                <img src={car} alt="Dashboard" />
                                            </div>
                                            <div>
                                                <h6 className="text-muted">Voiture</h6>
                                                <h5 className="mb-0">8</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="d-flex align-items-center gap-3 flex-wrap">
                                            <div className="p-4">
                                                <img src={semi} alt="Dashboard" />
                                            </div>
                                            <div>
                                                <h6 className="text-muted">Semi-remorque</h6>
                                                <h5 className="mb-0">15</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="d-flex align-items-center gap-3 flex-wrap">
                                            <div className="p-4">
                                                <img src={suv} alt="Dashboard" />
                                            </div>
                                            <div>
                                                <h6 className="text-muted">SUVs</h6>
                                                <h5 className="mb-0">9</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="d-flex align-items-center gap-3 flex-wrap">
                                            <div className="p-4">
                                                <img src={truck} alt="Dashboard" />
                                            </div>
                                            <div>
                                                <h6 className="text-muted">Camions</h6>
                                                <h5 className="mb-0">9</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*Analytics*/}
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div style={{ width: '65%', marginTop: '33px' }}>
                        <Linechart />
                        </div>
                        <div style={{ width: '30%', marginTop: '33px' }}>
                            <Piechart />
                        </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div style={{ width:'65%', marginTop: '33px', marginRight:'30px' }}>
                            <ServiceList services={dashboardServices} label="Service & Maintenance" />
                        </div>
                        <div style={{ display:'flex' , marginTop: '33px'}}>
                            <Vehiclecount />
                        </div>
                        </div>
                        
            </div>
        </div>
    </main>
  </div>
  );
};




export default Dashboard;
