import React, { useEffect, useState } from "react";
import { FaBell, FaUserShield } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../../features/auth/authSlice";
import { TbLogout2 } from "react-icons/tb";

const UserHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { employees } = useSelector((state) => state.employees);
    const { selectedEmail } = location.state || {};
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        const employee = employees.find((emp) => emp.email === selectedEmail);
        setSelectedEmployee(employee);
    }, [selectedEmail, employees]);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/");
    };

    return (
        <header className="bg-white rounded shadow-sm border mb-4 px-3 py-4">
            <div className="d-flex justify-content-between align-items-center">
                {/* Left Side */}
                <div className="d-flex align-items-center gap-3">
                    <div className="bg-primary text-white rounded p-2 d-flex align-items-center justify-content-center">
                        <FaUserShield size={24} />
                    </div>
                    <h5 className="mb-0 fw-bold text-dark">Employee Dashboard</h5>
                </div>

                {/* Right Side */}
                <div className="d-flex align-items-center gap-3">
                    {/* Notification */}
                    <button className="btn position-relative btn-light rounded-circle p-2">
                        <FaBell size={18} />
                        <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                            <span className="visually-hidden">New alerts</span>
                        </span>
                    </button>

                    {/* Profile */}
                    <div className="d-flex align-items-center gap-2">
                        <div className="rounded-circle overflow-hidden border" style={{ width: 50, height: 50 }}>
                            <img
                                src={
                                    selectedEmployee?.image ||
                                    "https://randomuser.me/api/portraits/men/65.jpg"
                                }
                                alt="Profile"
                                className="img-fluid w-100 h-100"
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                        <div className="d-none d-md-block">
                            <div className="text-muted small">Employee User</div>
                            <div className="fw-semibold text-dark">{selectedEmployee?.employeeName || "User"}</div>
                        </div>
                    </div>

                    {/* Logout */}
                    <button className="btn btn-outline-danger rounded-circle p-2" onClick={handleLogout}>
                        <TbLogout2 size={22} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default UserHeader;