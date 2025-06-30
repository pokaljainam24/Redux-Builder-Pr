import React from "react";
import { FaBell, FaUserShield } from "react-icons/fa";
import profileImg from '../../../public/my.jpg'

const Header = () => {
    return (
        <header className="bg-white rounded shadow mb-4 px-4 py-3">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                {/* Left - Logo and Title */}
                <div className="d-flex align-items-center gap-3">
                    <div className="p-2 rounded-circle bg-gradient">
                        <FaUserShield size={40} color="black" />
                    </div>
                    <h4 className="mb-0 fw-bold text-dark">Admin Dashboard</h4>
                </div>

                {/* Right - Notifications and User */}
                <div className="d-flex align-items-center gap-3">
                    {/* Notification Button */}
                    <button className="btn position-relative p-2 bg-light rounded-circle shadow-sm">
                        <FaBell color="gray" size={18} />
                        <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
                    </button>

                    {/* User Avatar and Info */}
                    <div className="d-flex align-items-center gap-2">
                        <img
                            src={profileImg}
                            alt="Admin Avatar"
                            className="rounded-circle"
                            style={{ width: 40, height: 40, objectFit: "cover" }}
                        />
                        <div>
                            <p className="mb-0 fw-semibold text-dark">Admin User</p>
                            <small className="text-muted fw-bold">Jainam Pokal</small>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
