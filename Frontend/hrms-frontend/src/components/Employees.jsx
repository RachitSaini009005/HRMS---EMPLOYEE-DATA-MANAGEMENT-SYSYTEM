import { useEffect, useState } from "react";
import { API } from "../api.js";
import "./Employees.css";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    Employee_Id: "",
    Full_name: "",
    Email_Field: "",
    Departments: "",
  });

  useEffect(() => { fetchEmployees(); }, []);

  const fetchEmployees = async () => {
    const response = await API.get("employees/");
    setEmployees(response.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("employees/", formData);
      setMessage(`✅ ${formData.Full_name} added successfully!`);
      fetchEmployees();
      setFormData({ Employee_Id: "", Full_name: "", Email_Field: "", Departments: "" });
    } catch (err) {
      setMessage("❌ Error adding employee.");
    }
  };

  const handleDelete = async (emp) => {
    if (window.confirm(`Are you sure you want to delete ${emp.Full_name}?`)) {
      await API.delete(`employees/${emp.Employee_Id}/`);
      setMessage(`🗑️ Employee ${emp.Full_name} removed.`);
      fetchEmployees();
    }
  };

  return (
    <div className="employees-container">
      {/* Professional Toast Notification */}
      {message && (
        <div className={`toast-msg ${message.includes('✅') ? 'success' : 'info'}`}>
          <span>{message}</span>
          <button onClick={() => setMessage("")}>&times;</button>
        </div>
      )}

      <div className="directory-layout">
        {/* Left Side: Add Employee Form */}
        <div className="form-section card">
          <h3>Register Employee</h3>
          <form className="hrms-form" onSubmit={handleSubmit}>
            <div className="input-field">
              <label>Employee ID</label>
              <input name="Employee_Id" placeholder="e.g. 101" value={formData.Employee_Id} onChange={handleChange} required />
            </div>
            <div className="input-field">
              <label>Full Name</label>
              <input name="Full_name" placeholder="John Doe" value={formData.Full_name} onChange={handleChange} required />
            </div>
            <div className="input-field">
              <label>Email Address</label>
              <input name="Email_Field" type="email" placeholder="john@company.com" value={formData.Email_Field} onChange={handleChange} required />
            </div>
            <div className="input-field">
              <label>Department</label>
              <input name="Departments" placeholder="e.g. Engineering" value={formData.Departments} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn-add">Save Employee</button>
          </form>
        </div>

        {/* Right Side: Employee Table */}
        <div className="table-section card">
          <h3>Employee Directory</h3>
          <div className="table-wrapper">
            <table className="hrms-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.Employee_Id}>
                    <td><span className="id-badge">{emp.Employee_Id}</span></td>
                    <td>
                      <div className="name-cell">
                        <span className="avatar-small">{emp.Full_name.charAt(0)}</span>
                        <div>
                          <div className="name-text">{emp.Full_name}</div>
                          <div className="email-text">{emp.Email_Field}</div>
                        </div>
                      </div>
                    </td>
                    <td>{emp.Departments}</td>
                    <td>
                      <button className="btn-delete" onClick={() => handleDelete(emp)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employees;
