import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { HiMiniPencilSquare } from "react-icons/hi2";
import {
  addTask,
  deleteTask,
  editTask,
  updateTask,
} from "../../features/tasks/tasksSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Asidebar from "../../components/Aside/Asidebar";
import { Badge, ProgressBar } from "react-bootstrap";

const Tasks = () => {
  const [taskData, setTaskData] = useState({});
  const { tasks, editTaskObj } = useSelector((state) => state.tasks);
  const { employees } = useSelector((state) => state.employees);
  const open = useSelector((state) => state.sidebar.open);
  const dispatch = useDispatch();

  useEffect(() => {
    setTaskData({ ...editTaskObj });
  }, [editTaskObj]);

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (taskData.id) {
      dispatch(updateTask(taskData));
      toast.success("Task Updated");
    } else {
      dispatch(addTask({ ...taskData, id: Date.now() }));
      toast.success("Task Assigned");
    }
    setTaskData({});
  };

  const handleTaskDelete = (id) => {
    dispatch(deleteTask(id));
    toast.error("Task Deleted");
  };

  const handleTaskUpdate = (id) => {
    dispatch(editTask(id));
  };

  return (
    <section className="d-flex">
      {/* Sidebar */}
      <Asidebar />

      {/* Main Content */}
      <div
        className={`flex-grow-1 p-4 bg-light min-vh-100 transition-all`}
        style={{ marginLeft: open ? "70px" : "260px" }}
      >
        <div className="row g-4">
          {/* Task Form */}
          <div className="col-lg-6">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h4 className="card-title text-primary mb-3">Assign Task</h4>
                <form onSubmit={handleTaskSubmit}>
                  <div className="mb-3">
                    <select
                      className="form-select"
                      name="empTasks"
                      value={taskData.empTasks || ""}
                      onChange={handleTaskChange}
                      required
                    >
                      <option value="" disabled>
                        Select Employee
                      </option>
                      {employees.map((emp, idx) => (
                        <option key={idx} value={emp.employeeName}>
                          {emp.employeeName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      name="taskTitle"
                      value={taskData.taskTitle || ""}
                      onChange={handleTaskChange}
                      className="form-control"
                      placeholder="Task Title"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <textarea
                      name="taskDescription"
                      value={taskData.taskDescription || ""}
                      onChange={handleTaskChange}
                      className="form-control"
                      rows="3"
                      placeholder="Task Description"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="date"
                      name="taskDate"
                      value={taskData.taskDate || ""}
                      onChange={handleTaskChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    {taskData.id ? "Update Task" : "Assign Task"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Task List */}
          <div className="col-lg-12">
            <h2>Task List</h2>
            {tasks.length === 0 ? (
              <p className="text-muted">No tasks assigned yet.</p>
            ) : (
              tasks.map((task, index) => {
                const progress = 4;
                const total = 4;
                const percentage = (progress / total) * 100;

                return (
                  <div key={index} className="card shadow-sm border-0 rounded-4 p-3 mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <Badge bg="success" className="px-2 py-2 rounded-pill">
                        Completed
                      </Badge>
                      <Badge bg="danger" className="px-2 py-2 rounded-pill bg-opacity-50 text-danger">
                        High Priority
                      </Badge>
                    </div>

                    <p className="text-dark fs-5 fw-bold mb-2">
                      Assigned to: {task.empTasks}
                    </p>

                    <h6 className="fw-semibold">{task.taskTitle}</h6>
                    <p className="text-muted mb-2">{task.taskDescription}</p>

                    <p className="mb-1">
                      <strong>Task Done:</strong> {progress} / {total}
                    </p>
                    <ProgressBar now={percentage} variant="info" className="rounded-pill mb-3" />

                    <div className="d-flex justify-content-between mt-1">
                      <div>
                        <p className="mb-1 text-muted fw-semibold">Start Date</p>
                        <p className="fw-bold">{task.taskDate}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-muted fw-semibold">Due Date</p>
                        <p className="fw-bold text-danger">15th Jun 2025</p>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      {/* Avatar(s) on Left */}
                      <div className="d-flex align-items-center">
                        <img
                          src="https://randomuser.me/api/portraits/men/32.jpg"
                          alt="User"
                          className="rounded-circle me-2"
                          style={{ width: "35px", height: "35px", objectFit: "cover" }}
                        />
                        <img
                          src="https://randomuser.me/api/portraits/women/44.jpg"
                          alt="User"
                          className="rounded-circle"
                          style={{ width: "35px", height: "35px", objectFit: "cover" }}
                        />
                      </div>

                      {/* Buttons on Right */}
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleTaskUpdate(task.id)}
                        >
                          <HiMiniPencilSquare />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleTaskDelete(task.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Tasks;
