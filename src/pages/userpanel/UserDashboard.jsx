import React, { useEffect, useState } from "react";
import UserHeader from "../../components/Header/UserHeader";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  FaEye,
  FaPaperclip,
  FaPaperPlane,
  FaPhone,
  FaVideo,
  FaSmile,
  FaEllipsisV,
} from "react-icons/fa";
import { openSalaryModal } from "../../features/modal/salaryModalSlice";
import SalaryModal from "../../components/Modal/SalaryModal";
import { addMessage } from "../../features/chats/chatSlice";
import { markTaskAsDone } from "../../features/tasks/tasksSlice";

const UserDashboard = () => {
  const location = useLocation();
  const { selectedEmail } = location.state || {};
  const dispatch = useDispatch();

  const [greetings, setGreetings] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [messageText, setMessageText] = useState("");

  const { tasks } = useSelector((state) => state.tasks);
  const { employees } = useSelector((state) => state.employees);
  const salarySlips = useSelector((state) => state.salarySlips.salaryArr);
  const messages = useSelector((state) => state.chat.messages);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const emp = employees.find((emp) => emp.email === selectedEmail);
    setSelectedEmployee(emp);
  }, [selectedEmail, employees]);

  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();
    const options = { year: "numeric", month: "long", day: "numeric" };

    if (hours < 12) setGreetings("Good Morning");
    else if (hours < 18) setGreetings("Good Afternoon");
    else setGreetings("Good Evening");

    setCurrentDate(date.toLocaleDateString(undefined, options));
    setCurrentDay(date.toLocaleString("en-US", { weekday: "long" }));
  }, []);

  const filteredTasks = tasks.filter((t) => t.empTasks === selectedEmployee?.employeeName);
  const filteredSlips = salarySlips.filter((s) => s.employeesSalarySlip === selectedEmployee?.employeeName);
  const filteredMessages = messages.filter(
    (msg) => msg.to === selectedEmployee?.employeeName || msg.from === selectedEmployee?.employeeName
  );

  const handleTaskDone = (taskId) => dispatch(markTaskAsDone(taskId));

  const handleSendMessage = () => {
    if (messageText.trim() && selectedEmployee) {
      dispatch(addMessage({
        to: selectedEmployee.employeeName,
        from: "Manager",
        content: messageText,
        time: new Date().toLocaleTimeString(),
      }));
      setMessageText("");
    }
  };

  return (
    <div className="container-fluid p-3">
      <UserHeader />

      {/* Greeting Banner */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="bg-info bg-gradient p-4 rounded-4 shadow text-white">
            <h3 className="fw-bold mb-1">{greetings}, {selectedEmployee?.employeeName || "User"}</h3>
            <p className="mb-0 fw-medium">{currentDay} — {currentDate}</p>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Task Section */}
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-primary text-white rounded-top-4">
              <strong><i className="fa fa-tasks me-2"></i>Assigned Tasks</strong>
            </div>
            <div className="card-body overflow-auto" style={{ maxHeight: "330px" }}>
              {filteredTasks.length === 0 ? (
                <p className="text-muted text-center">No tasks assigned.</p>
              ) : (
                <ul className="list-group list-group-flush">
                  {filteredTasks.map((task) => (
                    <li key={task.id} className={`list-group-item d-flex justify-content-between align-items-start ${task.isDone ? 'bg-light text-success' : 'bg-white'}`}>
                      <div>
                        <h6 className="fw-semibold mb-1">{task.taskTitle}</h6>
                        <small className="text-muted">{task.taskDescription}</small>
                      </div>
                      <div className="text-end">
                        <span className="badge bg-secondary mb-2">{task.taskDate}</span><br />
                        {!task.isDone && (
                          <button className="btn btn-outline-success btn-sm" onClick={() => handleTaskDone(task.id)}>
                            Done
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Salary Slip Section */}
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-success text-white rounded-top-4">
              <strong><i className="fa fa-wallet me-2"></i>Salary Slips</strong>
            </div>
            <div className="card-body overflow-auto" style={{ maxHeight: "330px" }}>
              {filteredSlips.length === 0 ? (
                <p className="text-muted text-center">No salary slips available.</p>
              ) : (
                filteredSlips.map((slip) => (
                  <div key={slip.id} className="d-flex justify-content-between align-items-center border-bottom py-2">
                    <div className="fw-semibold">{slip.month} {slip.year}</div>
                    <button className="btn btn-outline-primary btn-sm" onClick={() => {
                      const selected = employees.find(emp => emp.employeeName === slip.employeesSalarySlip);
                      dispatch(openSalaryModal(selected));
                    }}>
                      <FaEye />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className="col-12">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center rounded-top-4">
              <div>
                <strong>{selectedEmployee?.employeeName || "..."}</strong><br />
                <small>{selectedEmployee?.department || "..."}</small>
              </div>
              <div>
                <button className="btn btn-sm btn-light me-2"><FaPhone /></button>
                <button className="btn btn-sm btn-light me-2"><FaVideo /></button>
                <button className="btn btn-sm btn-light"><FaEllipsisV /></button>
              </div>
            </div>
            <div className="card-body bg-light px-4 py-3" style={{ height: '300px', overflowY: 'auto' }}>
              {filteredMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-3 mb-2 ${msg.from === "Manager" ? "bg-primary text-white ms-auto text-end" : "bg-white border text-dark"}`}
                  style={{ maxWidth: "70%" }}
                >
                  <p className="mb-1">{msg.content}</p>
                  <small className="d-block text-muted">{msg.time}</small>
                </div>
              ))}
            </div>
            <div className="card-footer bg-white rounded-bottom-4 border-top">
              <div className="input-group">
                <span className="input-group-text"><FaSmile /></span>
                <span className="input-group-text"><FaPaperclip /></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type your message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleSendMessage}><FaPaperPlane /></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SalaryModal />
    </div>
  );
};

export default UserDashboard;
