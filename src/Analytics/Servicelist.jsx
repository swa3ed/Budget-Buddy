import React from 'react';
import '../css/Servicelist.css'; // Make sure to create this CSS file and include it here

const statusStyles = {
  Done: 'green-status',
  In_process: 'orange-status',
  Not_started: 'red-status',
};

const ServiceList = ({ services, label }) => {
  return (
    <div className="service-list">
      <h2>{label}</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Service</th>
            <th> ID Vehicule </th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
                <td>{service.id}</td>
              <td>{service.date}</td>
              <td>{service.maintenance}</td>
              <td>{service.idvehicule}</td>
              <td className={statusStyles[service.status]}>{service.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceList;
