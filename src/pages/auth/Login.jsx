import React, { useEffect, useState } from "react";
import { BiLogIn } from "react-icons/bi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [role, setRole] = useState("admin");
  const [adminEmail, setAdminEmail] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");

  const { isLoggedIn } = useSelector((state) => state.login);
  const employees = useSelector((state) => state.employees.employees);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      if (role === "admin") {
        navigate("/DashBoard");
      } else {
        navigate("/UserDashboard", { state: { selectedEmail: employeeEmail } });
      }
    }
  }, [isLoggedIn, role, adminEmail, employeeEmail, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (role === "admin") {
      if (!adminEmail) return toast.error("Please enter admin email");
      dispatch(loginUser({ role, email: adminEmail }));
    } else {
      if (!employeeEmail) return toast.error("Please select an employee email");
      dispatch(loginUser({ role, email: employeeEmail }));
    }

    toast.success("Logging in Successfully");
  };

  return (
    <section className="bg-light d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "400px" }}>
        <div className="text-center mb-4">
          <IoPersonCircleOutline size={50} />
          <h4 className="mt-2">Welcome {role === "admin" ? "Admin" : "Employee"}</h4>
        </div>

        <form onSubmit={handleLogin}>
          {role === "admin" ? (
            <div className="mb-3">
              <label className="form-label">Admin Email</label>
              <input
                type="email"
                placeholder="Enter admin email"
                className="form-control"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
              />
            </div>
          ) : (
            <div className="mb-3">
              <label className="form-label">Select Employee Email</label>
              <select
                className="form-select"
                value={employeeEmail}
                onChange={(e) => setEmployeeEmail(e.target.value)}
                required
              >
                <option value="">-- Select Email --</option>
                {employees.length > 0 ? (
                  employees.map((emp, i) => (
                    <option key={i} value={emp.email}>
                      {emp.email}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading...</option>
                )}
              </select>
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3 d-flex gap-3 align-items-center justify-content-center">
            <strong>You are:</strong>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="admin"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={(e) => setRole(e.target.value)}
              />
              <label className="form-check-label" htmlFor="admin">Admin</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="employee"
                name="role"
                value="employee"
                checked={role === "employee"}
                onChange={(e) => setRole(e.target.value)}
              />
              <label className="form-check-label" htmlFor="employee">Employee</label>
            </div>
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
            >
              Login <BiLogIn size={20} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
