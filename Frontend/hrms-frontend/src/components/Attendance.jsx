import { useEffect, useState } from "react";
import { API } from "../api";
import "./Attendance.css";

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState("");
  // New State for filtering
  const [timeFilter, setTimeFilter] = useState("all"); 

  const [formData, setFormData] = useState({
    employee: "",
    date: new Date().toISOString().split('T')[0],
    status: "P",
  });

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await API.get("employees/");
      setEmployees(response.data);
    } catch (error) { console.error(error); }
  };

  const fetchAttendance = async () => {
    try {
      const response = await API.get("attendance/");
      setRecords(response.data);
    } catch (error) { console.error(error); }
  };

  // --- LOGIC: Filter Records by Week, Month, Year ---
  const getFilteredRecords = () => {
    const now = new Date();
    return records.filter(rec => {
      const recDate = new Date(rec.date);
      if (timeFilter === "week") {
        const diff = now.getDate() - now.getDay(); // Start of week
        return recDate >= new Date(now.setDate(diff));
      }
      if (timeFilter === "month") {
        return recDate.getMonth() === now.getMonth() && recDate.getFullYear() === now.getFullYear();
      }
      if (timeFilter === "year") {
        return recDate.getFullYear() === now.getFullYear();
      }
      return true; // "all"
    });
  };

  const activeRecords = getFilteredRecords();

  // --- LOGIC: Calculate Counts per Employee ---
  const stats = employees.reduce((acc, emp) => {
    const empRecs = activeRecords.filter(r => r.employee === emp.Employee_Id);
    acc[emp.Employee_Id] = {
      present: empRecs.filter(r => r.status === "P").length,
      absent: empRecs.filter(r => r.status === "A").length
    };
    return acc;
  }, {});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("attendance/", formData);
      setMessage("✅ Attendance saved successfully.");
      fetchAttendance();
      setFormData({ ...formData, employee: "" });
    } catch (error) { setMessage("❌ Error saving record."); }
  };

  const getEmployeeName = (id) => {
    const emp = employees.find(e => e.Employee_Id === id);
    return emp ? emp.Full_name : `ID: ${id}`;
  };

  return (
    <div className="attendance-container">
      {message && (
        <div className={`alert-banner ${message.includes('✅') ? 'success' : 'error'}`}>
          <span>{message}</span>
          <button className="close-btn" onClick={() => setMessage("")}>&times;</button>
        </div>
      )}

      {/* 1. Mark Attendance Form */}
      <div className="form-card">
        <h3 className="section-title">Mark New Entry</h3>
        <form className="attendance-form" onSubmit={handleSubmit}>
          {/* ... existing form inputs (Employee select, Date, Status) ... */}
          <div className="input-group">
            <label>Employee Name</label>
            <select name="employee" value={formData.employee} onChange={handleChange}>
              <option value="">Choose...</option>
              {employees.map(emp => <option key={emp.Employee_Id} value={emp.Employee_Id}>{emp.Full_name}</option>)}
            </select>
          </div>
          <div className="input-group">
            <label>Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
          </div>
          <button type="submit" className="btn-primary">Save Record</button>
        </form>
      </div>

      {/* 2. New Summary Section with Filters */}
      <div className="table-card">
        <div className="table-header-flex">
          <h3 className="section-title">Employee Performance</h3>
          <div className="filter-tabs">
            {['all', 'week', 'month', 'year'].map(t => (
              <button 
                key={t} 
                className={timeFilter === t ? 'active-tab' : ''} 
                onClick={() => setTimeFilter(t)}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        
        <table className="hrms-table summary-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Present</th>
              <th>Absent</th>
              <th>Reliability</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => {
              const { present: p, absent: a } = stats[emp.Employee_Id] || { present: 0, absent: 0 };
              const total = p + a;
              const ratio = total > 0 ? Math.round((p / total) * 100) : 0;
              return (
                <tr key={emp.Employee_Id}>
                  <td>{emp.Full_name}</td>
                  <td><span className="count-tag p">{p}</span></td>
                  <td><span className="count-tag a">{a}</span></td>
                  <td>
                    <div className="mini-progress"><div style={{ width: `${ratio}%` }}></div></div>
                    <small>{ratio}%</small>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 3. Detailed Logs */}
      <div className="table-card">
        <h3 className="section-title">Raw Logs ({activeRecords.length})</h3>
        <table className="hrms-table">
          {/* ... existing table headers ... */}
          <tbody>
            {activeRecords.map((rec, index) => (
              <tr key={index}>
                <td>{getEmployeeName(rec.employee)}</td>
                <td>{rec.date}</td>
                <td><span className={`status-pill ${rec.status === 'P' ? 'p' : 'a'}`}>{rec.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;
