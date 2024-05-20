import React, { useEffect, useState } from "react";
import {
  fetchExpense,
  deleteExpense,
  updateExpense,
} from "../services/expenseService";
import Navbar from "../Layouts/Navbar";
import Sidebar from "../Layouts/Sidebar";
import "../css/dashboard.css";
import wallet from "../Assets/svg/wallet.svg";  
import bank from "../Assets/svg/bank.svg";    
import card from "../Assets/svg/card.svg";  


const Expenses = ({ sidebarState, setSidebarState }) => {
  const [expenses, setExpense] = useState([]);

  const [editExpenseId, setEditExpenseId] = useState(null);

  const [editFormData, setEditFormData] = useState({
    id: "",
    expense: "",
    type: "",
    amount: "",
    status: "",
  });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleEditClick = (expense) => {
    setEditExpenseId(expense.id);
    setEditFormData(expense);
  };


  const handleSaveClick = async () => {
    try {
        console.log("Updating expense with data:", editFormData); // Log the data being sent
        const updatedData = await updateExpense(editFormData.id, editFormData);
        if (updatedData) {
            // Successfully updated the vehicle
            const updatedExpense = expenses.map(expense =>
                expense.id === updatedData.id ? updatedData : expense
            );
            setExpense(updatedExpense);
            setEditExpenseId(null);
            alert("Expense updated successfully.");
        } else {
            // If no data was returned, consider the update failed
            alert("Failed to update the expense.");
        }
    } catch (error) {
        console.error("Error updating expense:", error);
        if (error.response) {
            // More detailed error information from server response
            console.error("Server responded with:", error.response.data);
        } else {
            // Generic error alert if no response from the server
            alert("Update failed: Network or server error.");
        }
    }
};




  const handleDeleteExp = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      const success = await deleteExpense(id);

      if (success) {
        setExpense((prevExpenses) =>
          prevExpenses.filter((expense) => expense.id !== id)
        );
        alert("Expense deleted successfully.");
      } else {
        alert("Failed to delete the expense.");
      }
    }
  };

  useEffect(() => {
    const loadExpense = async () => {
      try {
        const data = await fetchExpense();
        if (Array.isArray(data)) {
          setExpense(data);
          setExpense(prevExpenses => ([
            ...prevExpenses,
            // Groceries
            { id: 101, expense: "Groceries", type: "Marjane", amount: 100, status: "cleared" },
            { id: 102, expense: "Groceries", type: "Marche", amount: 50, status: "cleared" },
            { id: 103, expense: "Groceries", type: "Glovo", amount: 150, status: "pending" },
            // Entertainement
            { id: 301, expense: "Entertainement", type: "Cafe", amount: 200, status: "pending" },
            { id: 302, expense: "Entertainement", type: "Restaurant", amount: 80, status: "pending" },
            // Utilities
            { id: 401, expense: "Utilities", type: "Plombing", amount: 300, status: "cleared" }
          ]));
        } else {
          console.error("Data is not an array:", data);
          setExpense([]);
        }
      } catch (error) {
        console.error("Error fetching expense:", error);
        setExpense([]);
      }
    };
    loadExpense();
  }, []);

  return (
    <div className="main d-flex min-vh-100 flex-nowrap">
      <Sidebar
        activeItem={"expenses"}
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
            {/* Table */}
            <div className="table-responsive">
              <table className="table table-main table-hover">
                <thead>
                  <tr>
                    <th>Expense ID</th>
                    <th>Expense</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense) => (
                    <tr key={expense.id}>
                      <td>{expense.id}</td>
                      {editExpenseId === expense.id ? (
                        <>
                          <td>
                            <input
                              type="text"
                              name="expense"
                              value={editFormData.expense}
                              onChange={handleInputChange}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="type"
                              value={editFormData.type}
                              onChange={handleInputChange}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="amount"
                              value={editFormData.amount}
                              onChange={handleInputChange}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="status"
                              value={editFormData.status}
                              onChange={handleInputChange}
                            />
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{expense.expense}</td>
                          <td>{expense.type}</td>
                          <td>{expense.amount}</td>
                          <td>{expense.status}</td>
                        </>
                      )}
                      <td className="d-flex gap-3 align-items-center justify-content-center">
                      <button onClick={handleSaveClick} className="btn btn-success">Save</button>

                        <button
                          onClick={() => handleEditClick(expense)}
                          className="btn btn-primary"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteExp(expense.id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Expenses;