import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../../features/chats/chatSlice";
import Asidebar from "../../components/Aside/Asidebar";
import {
  FaSearch,
  FaPaperPlane,
  FaSmile,
  FaPaperclip,
  FaPhone,
  FaVideo,
  FaEllipsisV,
} from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import Header from "../../components/Header/Header";

const Chat = () => {
  const employees = useSelector((state) => state.employees.employees);
  const messages = useSelector((state) => state.chat.messages);
  const open = useSelector((state) => state.sidebar.open);
  const dispatch = useDispatch();

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // ✅ Add this

  const handleSendMessage = () => {
    if ((messageText.trim() || selectedFile) && selectedEmployee) {
      dispatch(
        addMessage({
          to: selectedEmployee.employeeName,
          from: "Manager",
          content: messageText,
          time: new Date().toLocaleTimeString(),
          file: selectedFile,
        })
      );
      setMessageText("");
      setSelectedFile(null); // ✅ Clear file
    }
  };

  const filteredMessages = messages.filter(
    (msg) =>
      msg.to === selectedEmployee?.employeeName ||
      msg.from === selectedEmployee?.employeeName
  );

  return (
    <section className="d-flex">
      <Asidebar />

      <div
        className="flex-grow-1 p-4 bg-light min-vh-100"
        style={{ marginLeft: open ? "70px" : "260px", transition: "0.3s" }}
      >
        <Header />

        <div className="mb-4">
          <h2 className="fw-bold text-primary">Employee Communication</h2>
          <p className="text-muted">Manage and communicate with your team</p>
        </div>

        <div className="row g-3">
          {/* Left Panel: Employee List */}
          <div className="col-md-4">
            <div className="card shadow border-0">
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Team Members</h5>
                <FaSearch />
              </div>
              <div className="card-body p-2">
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="form-control mb-3"
                />
                <ul className="list-group">
                  {employees.map((emp, index) => (
                    <li
                      key={index}
                      className={`list-group-item list-group-item-action rounded-2 mb-2 cursor-pointer ${selectedEmployee?.employeeName === emp.employeeName
                          ? "active bg-primary text-white"
                          : ""
                        }`}
                      onClick={() => setSelectedEmployee(emp)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <IoPersonCircleOutline size={24} />
                        <div>
                          <div className="fw-semibold">{emp.employeeName}</div>
                          <small className="text-muted">
                            {emp.department}
                          </small>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Panel: Chat Section */}
          <div className="col-md-8">
            <div className="card shadow border-0 h-100 d-flex flex-column">
              {/* Chat Header */}
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={
                      selectedEmployee?.image ||
                      "https://randomuser.me/api/portraits/men/65.jpg"
                    }
                    alt="emp"
                    className="rounded-circle"
                    style={{
                      width: "36px",
                      height: "36px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <strong>{selectedEmployee?.employeeName || "..."}</strong>
                    <br />
                    <small>
                      {selectedEmployee?.department || "..."} • Active now
                    </small>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <FaPhone />
                  <FaVideo />
                  <FaEllipsisV />
                </div>
              </div>

              {/* Chat Body */}
              <div
                className="flex-grow-1 overflow-auto p-3"
                style={{ backgroundColor: "#f8f9fa", maxHeight: "400px" }}
              >
                {filteredMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded mb-2 text-white w-75 ${msg.from === "Manager"
                        ? "bg-primary ms-auto"
                        : "bg-secondary"
                      }`}
                  >
                    <div>{msg.content}</div>
                    {msg.file && (
                      <div className="mt-1">
                        📎 <strong>{msg.file.name}</strong>
                      </div>
                    )}
                    <div className="text-end small opacity-75">{msg.time}</div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="card-footer bg-white border-top">
                <div className="d-flex align-items-center gap-2">
                  <button className="btn btn-light d-none d-md-block">
                    <FaSmile />
                  </button>
                  <label className="btn btn-light d-none d-md-block m-0">
                    <FaPaperclip />
                    <input
                      type="file"
                      hidden
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type your message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                  />
                  <button className="btn btn-primary" onClick={handleSendMessage}>
                    <FaPaperPlane />
                  </button>
                </div>
                {selectedFile && (
                  <div className="mt-2 small text-muted">
                    Attached: <strong>{selectedFile.name}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
