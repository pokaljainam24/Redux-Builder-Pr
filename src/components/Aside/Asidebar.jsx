import React from "react";
import { BiMenuAltLeft, BiMenuAltRight } from "react-icons/bi";
import { FaTable, FaTasks } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { TbLogout2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toggleSidebar } from "../../features/sidebar/sidebarSlice";
import { logoutUser } from "../../features/auth/authSlice";

const Asidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const open = useSelector((state) => state.sidebar.open);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/");
    };

    const menuData = [
        { path: "/DashBoard", icon: <MdDashboard />, name: "Dashboard" },
        { path: "/Form", icon: <BsFillPersonPlusFill />, name: "Form" },
        { path: "/Tasks", icon: <FaTasks />, name: "Tasks" },
        { path: "/Chat", icon: <IoMdChatbubbles />, name: "Chats" },
        { path: "/EmpDataTable", icon: <FaTable />, name: "Table" },
    ];

    return (
        <aside
            className="d-flex flex-column justify-content-between position-fixed top-0 start-0 h-100 bg-dark text-white p-3"
            style={{
                width: open ? "70px" : "260px",
                transition: "width 0.3s ease",
                zIndex: 1040,
            }}
        >
            {/* Top Section: Menu toggle + nav links */}
            <div>
                {/* Toggle Button */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    {!open && <h5 className="mb-0">Menu</h5>}
                    <button
                        onClick={() => dispatch(toggleSidebar())}
                        className="btn btn-sm btn-light"
                    >
                        {open ? <BiMenuAltLeft size={20} /> : <BiMenuAltRight size={20} />}
                    </button>
                </div>

                {/* Navigation Links */}
                <ul className="nav flex-column">
                    {menuData.map(({ path, icon, name }, idx) => (
                        <li key={idx} className="nav-item my-2">
                            <Link
                                to={path}
                                className="nav-link text-white d-flex align-items-center justify-content-start gap-2"
                            >
                                <span className="fs-5 d-flex justify-content-center align-items-center">
                                    {icon}
                                </span>
                                {!open && <span className="mx-4">{name}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Bottom Section: Logout button fixed at bottom */}
            <div className="mt-auto">
                <button
                    onClick={handleLogout}
                    className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2"
                >
                    <TbLogout2 size={20} />
                    {!open && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );
};

export default Asidebar;
