import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { createUser, updateUser } from "../../features/employees/employeeSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Asidebar from "../../components/Aside/Asidebar";

const Form = () => {
  const [employee, setEmployee] = useState({
    employeeName: "",
    email: "",
    department: "",
    employeeSalary: "",
    hra: "",
    da: "",
    ta: "",
    bonus: "",
    pf: "",
    pt: "",
    tax: "",
    shiftStart: "",
    shiftEnd: "",
    description: "",
    skills: "",
    notes: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { editData } = useSelector((state) => state.employees);
  const isSidebarOpen = useSelector((state) => state.sidebar.open);

  useEffect(() => {
    if (editData && Object.keys(editData).length > 0) {
      setEmployee({ ...editData });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (employee.id) {
      dispatch(updateUser(employee));
      toast.info("Update Successful");
    } else {
      dispatch(createUser({ ...employee, id: Date.now() }));
      toast.success("Item Added");
    }

    setEmployee({
      employeeName: "",
      email: "",
      department: "",
      employeeSalary: "",
      hra: "",
      da: "",
      ta: "",
      bonus: "",
      pf: "",
      pt: "",
      tax: "",
      shiftStart: "",
      shiftEnd: "",
      description: "",
      skills: "",
      notes: "",
    });

    navigate("/EmpDataTable");
  };

  const totalEarnings =
    (parseFloat(employee.employeeSalary) || 0) +
    (parseFloat(employee.hra) || 0) +
    (parseFloat(employee.da) || 0) +
    (parseFloat(employee.ta) || 0) +
    (parseFloat(employee.bonus) || 0);

  const totalDeductions =
    (parseFloat(employee.tax) || 0) +
    (parseFloat(employee.pf) || 0) +
    (parseFloat(employee.pt) || 0);

  const netSalary = totalEarnings - totalDeductions;
  const isFormValid = employee.employeeName && employee.email && employee.department;

  return (
    <section className="d-flex">
      <Asidebar />
      <div className="flex-grow-1" style={{ marginLeft: isSidebarOpen ? "70px" : "260px", transition: "margin-left 0.3s ease" }}>
        <div className="container-fluid py-4">
          <Header />

          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card text-white bg-success mb-3">
                <div className="card-body text-center">
                  <h5 className="card-title">Total Earnings</h5>
                  <p className="card-text fs-4 fw-bold">₹{totalEarnings.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card text-white bg-danger mb-3">
                <div className="card-body text-center">
                  <h5 className="card-title">Total Deductions</h5>
                  <p className="card-text fs-4 fw-bold">₹{totalDeductions.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card text-white bg-primary mb-3">
                <div className="card-body text-center">
                  <h5 className="card-title">Net Salary</h5>
                  <p className="card-text fs-4 fw-bold">₹{netSalary.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm p-4">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" name="employeeName" value={employee.employeeName} onChange={handleChange} />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" name="email" value={employee.email} onChange={handleChange} />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Department</label>
                  <input type="text" className="form-control" name="department" value={employee.department} onChange={handleChange} />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Salary</label>
                  <input type="number" className="form-control" name="employeeSalary" value={employee.employeeSalary} onChange={handleChange} />
                </div>

                <div className="col-md-4">
                  <label className="form-label">HRA</label>
                  <input type="number" className="form-control" name="hra" value={employee.hra} onChange={handleChange} />
                </div>

                <div className="col-md-4">
                  <label className="form-label">DA</label>
                  <input type="number" className="form-control" name="da" value={employee.da} onChange={handleChange} />
                </div>

                <div className="col-md-4">
                  <label className="form-label">TA</label>
                  <input type="number" className="form-control" name="ta" value={employee.ta} onChange={handleChange} />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Bonus</label>
                  <input type="number" className="form-control" name="bonus" value={employee.bonus} onChange={handleChange} />
                </div>

                <div className="col-md-4">
                  <label className="form-label">PF</label>
                  <input type="number" className="form-control" name="pf" value={employee.pf} onChange={handleChange} />
                </div>

                <div className="col-md-4">
                  <label className="form-label">PT</label>
                  <input type="number" className="form-control" name="pt" value={employee.pt} onChange={handleChange} />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Tax</label>
                  <input type="number" className="form-control" name="tax" value={employee.tax} onChange={handleChange} />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Shift Start</label>
                  <input type="time" className="form-control" name="shiftStart" value={employee.shiftStart} onChange={handleChange} />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Shift End</label>
                  <input type="time" className="form-control" name="shiftEnd" value={employee.shiftEnd} onChange={handleChange} />
                </div>

                <div className="col-12">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" name="description" rows="3" value={employee.description} onChange={handleChange}></textarea>
                </div>
              </div>

              <div className="text-end mt-4 border-top pt-3">
                <button
                  type="submit"
                  className="btn btn-primary px-5 fw-semibold shadow"
                  disabled={!isFormValid}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;