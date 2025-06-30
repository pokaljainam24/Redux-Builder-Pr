import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  PieChart, Pie, Cell
} from "recharts";
import { FaCrown, FaEye, FaTrash, FaMoon, FaSun } from "react-icons/fa";
import Header from "../../components/Header/Header";
import Asidebar from "../../components/Aside/Asidebar";
import Modal from "../../components/Modal/Modal";
import SalaryModal from "../../components/Modal/SalaryModal";
import { addSalary, deleteSalary } from "../../features/salary-slip/salarySlice";
import { openSalaryModal } from "../../features/modal/salaryModalSlice";

const Dashboard = () => {
  const [greetings, setGreetings] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [ranking, setRanking] = useState([]);
  const [salary, setSalary] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(true);

  const employees = useSelector((state) => state.employees.employees);
  const salarySlips = useSelector((state) => state.salarySlips.salaryArr);
  const { tasks } = useSelector((state) => state.tasks);
  const open = useSelector((state) => state.sidebar.open);
  const dispatch = useDispatch();

  useEffect(() => {
    const rankingInterval = setInterval(() => {
      const employeesWithRanking = employees.map((emp) => ({
        ...emp,
        ranking: Math.floor(Math.random() * 100) + 1,
      }));
      employeesWithRanking.sort((a, b) => b.ranking - a.ranking);
      setRanking(employeesWithRanking);
    }, 5000);
    return () => clearInterval(rankingInterval);
  }, [employees]);

  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();
    const options = { year: "numeric", month: "long", day: "numeric" };
    setGreetings(hours < 12 ? "Good Morning" : hours < 18 ? "Good Afternoon" : "Good Evening");
    setCurrentDate(date.toLocaleDateString(undefined, options));
    setCurrentDay(date.toLocaleString("en-US", { weekday: "long" }));
  }, []);

  const handleChangeSalary = (e) => {
    const { name, value } = e.target;
    setSalary({ ...salary, [name]: value });
  };

  const handleSubmitSalary = (e) => {
    e.preventDefault();
    dispatch(addSalary({ ...salary, id: Date.now() }));
    setSalary({});
  };

  const handleDeleteSalary = (id) => dispatch(deleteSalary(id));
  const handleViewSlip = (empName) => {
    const selected = employees.find((emp) => emp.employeeName === empName);
    dispatch(openSalaryModal(selected));
  };

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];

  const getDepartmentData = (empArr) => {
    const counts = {};
    empArr.forEach(emp => {
      const dept = emp.department || "Unknown";
      counts[dept] = (counts[dept] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  };

  return (
    <div className={`d-flex min-vh-100 ${isDarkMode ? 'dark-theme' : 'bg-light'}`}>
      <Asidebar />
      <main
        className="flex-grow-1 overflow-auto p-4 position-relative"
        style={{
          marginLeft: open ? "70px" : "260px",
          transition: "margin-left 0.3s ease"
        }}
      >
        {/* Toggle button for theme */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="btn btn-sm btn-outline-dark text-light bg-dark d-flex py-2 position-absolute top-0 end-0 m-3"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>

        <Header />

        <div className="bg-primary text-white p-4 rounded mb-4">
          <h2 className="h3">{greetings} Jainam Pokal</h2>
          <p className="mb-0">{currentDay}, {currentDate}</p>
        </div>

        <div className="row g-3 mb-4">
          <StatCard title="Employees" value={employees.length} />
          <StatCard title="Tasks" value={tasks.length} />
          <StatCard title="Completed" value={tasks.filter(t => t.isDone).length} color="text-success" />
          <StatCard title="Pending" value={tasks.filter(t => !t.isDone).length} color="text-warning" />
        </div>

        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">Analytics Overview</h5>
              <div className="row">
                <div className="col-md-6">
                  <h6 className="mb-3">Task Status</h6>
                  <BarChart width={400} height={250} data={[
                    {
                      name: "Tasks",
                      Completed: tasks.filter(t => t.isDone).length,
                      Pending: tasks.filter(t => !t.isDone).length
                    }
                  ]}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Completed" fill="#28a745" />
                    <Bar dataKey="Pending" fill="#ffc107" />
                  </BarChart>
                </div>

                <div className="col-md-6">
                  <h6 className="mb-3">Department Distribution</h6>
                  <PieChart width={400} height={250}>
                    <Pie
                      data={getDepartmentData(employees)}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {getDepartmentData(employees).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4 mt-2">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Salary Slip Generator</h5>
                <form onSubmit={handleSubmitSalary}>
                  <select name="employeesSalarySlip" className="form-select mb-2" onChange={handleChangeSalary}>
                    <option>Select Employee</option>
                    {employees.map((emp, i) => (
                      <option key={i} value={emp.employeeName}>{emp.employeeName}</option>
                    ))}
                  </select>
                  <select name="month" className="form-select mb-2" onChange={handleChangeSalary}>
                    <option>Select Month</option>
                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m, i) => (
                      <option key={i} value={m.toLowerCase()}>{m}</option>
                    ))}
                  </select>
                  <input type="number" name="year" placeholder="Year" className="form-control mb-2" onChange={handleChangeSalary} />
                  <button className="btn btn-primary w-100">Generate</button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body overflow-auto" style={{ maxHeight: 400 }}>
                <h5 className="card-title">Recent Salary Slips</h5>
                {salarySlips.map((slip) => (
                  <div key={slip.id} className="d-flex justify-content-between align-items-center border rounded p-2 mb-2">
                    <div>
                      <strong>{slip.employeesSalarySlip}</strong>
                      <div className="text-muted small">{slip.month}, {slip.year}</div>
                    </div>
                    <div className="d-flex gap-2">
                      <button onClick={() => handleDeleteSalary(slip.id)} className="btn btn-sm btn-outline-danger"><FaTrash /></button>
                      <button onClick={() => handleViewSlip(slip.employeesSalarySlip)} className="btn btn-sm btn-outline-primary"><FaEye /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Top Performers</h5>
                <ul className="list-unstyled">
                  {ranking.slice(0, 5).map((emp, i) => (
                    <li key={i} className="d-flex align-items-center justify-content-between mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <div className="badge bg-primary rounded-circle px-3 py-2">{emp.ranking}</div>
                        <div>
                          <div>{emp.employeeName}</div>
                          <small className="text-muted">{emp.department}</small>
                        </div>
                      </div>
                      {i === 0 && <FaCrown className="text-warning" />}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Modal />
        <SalaryModal />
      </main>
    </div>
  );
};

const StatCard = ({ title, value, color = "text-primary" }) => (
  <div className="col">
    <div className="card shadow-sm text-center">
      <div className="card-body">
        <p className="text-muted mb-1 small">{title}</p>
        <h5 className={`fw-bold ${color}`}>{value}</h5>
      </div>
    </div>
  </div>
);

export default Dashboard;
