import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../features/modal/modalSlice";
import { useNavigate } from "react-router-dom";
import { editUser } from "../../features/employees/employeeSlice";
import { Modal as BootstrapModal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Modal = () => {
    const { isOpen, employee } = useSelector((state) => state.modal);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!isOpen || !employee) return null;

    const totalEarnings =
        Number(employee.employeeSalary || 0) +
        Number(employee.hra || 0) +
        Number(employee.da || 0) +
        Number(employee.ta || 0) +
        Number(employee.bonus || 0);

    const totalDeductions =
        Number(employee.tax || 0) + Number(employee.pf || 0) + Number(employee.pt || 0);

    const netSalary = totalEarnings - totalDeductions;

    const handleEdit = (id) => {
        dispatch(editUser(id));
        dispatch(closeModal());
        navigate("/Form");
    };

    return (
        <BootstrapModal show={true} onHide={() => dispatch(closeModal())} size="xl" centered scrollable>
            <BootstrapModal.Header closeButton className="bg-primary text-white">
                <BootstrapModal.Title>Employee Details</BootstrapModal.Title>
            </BootstrapModal.Header>
            <BootstrapModal.Body>
                {/* Profile Header */}
                <div className="bg-gradient p-4 rounded text-white mb-4" style={{ background: "linear-gradient(to right, #6366F1, #8B5CF6)" }}>
                    <div className="d-flex align-items-center">
                        <div className="me-4">
                            <div className="bg-white text-primary rounded-circle d-flex justify-content-center align-items-center" style={{ width: 80, height: 80 }}>
                                <i className="bi bi-person-circle fs-1"></i>
                            </div>
                        </div>
                        <div className="flex-grow-1">
                            <h4 className="mb-0">{employee.employeeName}</h4>
                            <small>Senior Software Engineer</small>
                            <div className="mt-2">
                                <p className="mb-1"><strong>Department:</strong> {employee.department}</p>
                                <p className="mb-1"><strong>Email:</strong> {employee.email}</p>
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-light" onClick={() => handleEdit(employee.id)}>Edit Profile</button>
                        </div>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="row g-4">
                    {/* Performance */}
                    <div className="col-md-6">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Performance Metrics</h5>
                                <p className="mb-2">Performance Rating: <strong>4.8/5</strong></p>
                                <p>Projects Completed: <strong>24</strong></p>
                                <div className="progress mb-2"><div className="progress-bar bg-success" style={{ width: "92%" }}>Productivity 92%</div></div>
                                <div className="progress mb-2"><div className="progress-bar bg-info" style={{ width: "89%" }}>Quality 89%</div></div>
                                <div className="progress"><div className="progress-bar bg-warning" style={{ width: "95%" }}>Teamwork 95%</div></div>
                            </div>
                        </div>
                    </div>

                    {/* Salary */}
                    <div className="col-md-6">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Compensation</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Basic Salary: ${employee.employeeSalary}</li>
                                    <li className="list-group-item">Annual Salary: ${employee.employeeSalary * 12}</li>
                                    <li className="list-group-item">HRA: ${employee.hra}</li>
                                    <li className="list-group-item">DA: ${employee.da}</li>
                                    <li className="list-group-item">TA: ${employee.ta}</li>
                                    <li className="list-group-item">Bonus: ${employee.bonus}</li>
                                </ul>
                                <h6 className="mt-3">Deductions</h6>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">PF: ${employee.pf}</li>
                                    <li className="list-group-item">PT: ${employee.pt}</li>
                                    <li className="list-group-item">Tax: ${employee.tax}</li>
                                </ul>
                                <h6 className="mt-3">Net Salary: <strong>${netSalary}</strong></h6>
                            </div>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="col-md-12">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Skills & Qualifications</h5>
                                <p><strong>Technical Skills:</strong></p>
                                <div className="d-flex flex-wrap gap-2 mb-3">
                                    {["JavaScript", "React", "Node.js", "TypeScript", "AWS", "Docker", "MongoDB", "GraphQL"].map((skill, idx) => (
                                        <span key={idx} className="badge bg-primary">{skill}</span>
                                    ))}
                                </div>
                                <p><strong>Soft Skills:</strong></p>
                                <div className="d-flex flex-wrap gap-2 mb-3">
                                    {["Leadership", "Teamwork", "Problem Solving", "Communication"].map((soft, idx) => (
                                        <span key={idx} className="badge bg-secondary">{soft}</span>
                                    ))}
                                </div>
                                <p><strong>Key Skills:</strong> {employee.skills}</p>
                                <p><strong>Summary:</strong> {employee.description}</p>
                                <p><strong>Notes:</strong> {employee.notes}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </BootstrapModal.Body>
        </BootstrapModal>
    );
};

export default Modal;
