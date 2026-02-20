import React from 'react';
import Employees from "./components/Employees";
import Attendance from "./components/Attendance";
import './App.css'; // Make sure to create this file

function App() {
  return (
    <div className="app-container">
      {/* Sidebar for a professional dashboard look */}
      <aside className="sidebar">
        <div className="logo">HRMS<span>Lite</span></div>
        <nav className="nav-menu">
          <div className="nav-item active">Dashboard</div>
          <div className="nav-item">Employee Directory</div>
          <div className="nav-item">Attendance logs</div>
          <div className="nav-item">Settings</div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="content">
        <header className="top-bar">
          <h1>Dashboard Overview</h1>
          <div className="user-profile">Admin User</div>
        </header>

        <div className="dashboard-grid">
          <section className="card">
            <div className="card-header">
              <h2>Real-time Attendance</h2>
            </div>
            <Attendance />
          </section>

          <section className="card">
            <div className="card-header">
              <h2>Employee List</h2>
            </div>
            <Employees />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
