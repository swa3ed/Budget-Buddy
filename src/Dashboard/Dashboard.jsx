import React from "react";
import Navbar from "../Layouts/Navbar";
import Sidebar from "../Layouts/Sidebar";
import Linechart from "../Analytics/Linechart"; //  for expenses over time
import Piechart from "../Analytics/Piechart"; //  for budget distribution
import Balanceoverview from "../Analytics/Balanceoverview"; //  account balances
import Transactionlist from "../Analytics/Transactionlist"; // for recent transactions
import "../css/dashboard.css";
import wallet from "../Assets/svg/wallet.svg";
import bank from "../Assets/svg/bank.svg";
import card from "../Assets/svg/card.svg";

const financialdata = [
  {
    ID: "1",
    date: "2023-05-01",
    category: "Groceries",
    amount: 150.0,
    status: "Cleared",
  },
  {
    ID: "2",
    date: "2023-05-02",
    category: "Utilities",
    amount: 120.0,
    status: "Pending",
  },
  {
    ID: "3",
    date: "2023-05-03",
    category: "Entertainment",
    amount: 90.0,
    status: "Cleared",
  },
  // Add more objects as needed
];

const Dashboard = ({ sidebarState, setSidebarState }) => {
  return (
    <div className="main d-flex min-vh-100 flex-nowrap">
      <Sidebar
        activeItem={"dashboard"}
        sidebarState={sidebarState}
        setSidebarState={setSidebarState}
      />
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
                      <img src={wallet} alt="Dashboard" style={{ width: '30%', height: 'auto', objectFit: 'contain' }} />
                      </div>
                      <div>
                        <h6 className="text-muted">Wallet</h6>
                        <h5 className="mb-0">186,000.00$</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="d-flex align-items-center gap-3 flex-wrap">
                      <div className="p-4">
                      <img src={bank} alt="Dashboard" style={{ width: '30%', height: 'auto', objectFit: 'contain' }} />
                      </div>
                      <div>
                        <h6 className="text-muted">Bank</h6>
                        <h5 className="mb-0">Bank of Africa</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="d-flex align-items-center gap-3 flex-wrap">
                      <div className="p-4">
                      <img src={card} alt="Dashboard" style={{ width: '30%', height: 'auto', objectFit: 'contain' }} />
                      </div>
                      <div>
                        <h6 className="text-muted">Card</h6>
                        <h5 className="mb-0">Master Card</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*Analytics*/}
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div style={{ width: "65%", marginTop: "33px" }}>
                <Linechart />
              </div>
              <div style={{ display: "flex", width: "30%", marginTop: "33px" }}>
                <Piechart data = {financialdata}/>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div
                style={{ width: "65%", marginTop: "33px", marginRight: "30px" }}
              >
                <Transactionlist
                  services={financialdata}
                  label="Transactions"
                />{" "}
                {/* Pass financialData as a prop */}
              </div>
              <div style={{ display: "flex", marginTop: "33px" }}>
                <Balanceoverview />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
