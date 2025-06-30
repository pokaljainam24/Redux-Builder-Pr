import React, { useMemo, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, editUser } from "../../features/employees/employeeSlice";
import { FaDownload, FaTrash } from "react-icons/fa";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { toast } from "react-toastify";
import Asidebar from "../../components/Aside/Asidebar";
import DataTable from "react-data-table-component";

const convertArrayOfObjectsToCSV = (array) => {
  const header = Object.keys(array[0]).join(",") + "\n";
  const rows = array.map((obj) => Object.values(obj).join(",")).join("\n");
  return header + rows;
};

const downloadCSV = (array) => {
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;
  const filename = "export.csv";
  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }
  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
};

const Export = ({ onExport }) => (
  <button onClick={onExport} className="btn btn-outline-success btn-sm">
    <FaDownload className="me-1" /> Export CSV
  </button>
);

const EmpDataTable = () => {
  const [selectedRow, setSelectedRow] = useState([]);
  const [textFilter, setTextFilter] = useState("");
  const employees = useSelector((state) => state.employees.employees);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef();

  const actionsMemo = useMemo(
    () => <Export onExport={() => downloadCSV(employees)} />,
    [employees]
  );

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    toast.error("Delete Successful");
  };

  const handleEdit = (id) => {
    dispatch(editUser(id));
    navigate("/Form");
  };

  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: false,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Name",
      selector: (row) => row.employeeName,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row) => row.department,
      sortable: true,
    },
    {
      name: "Salary",
      selector: (row) => `₹${row.employeeSalary}`,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(row.id)}>
            <HiMiniPencilSquare />
          </button>
          <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(row.id)}>
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.employeeName?.toLowerCase().includes(textFilter.toLowerCase()) ||
      emp.department?.toLowerCase().includes(textFilter.toLowerCase())
  );

  return (
    <section className="d-flex mt-4">
      <Asidebar />

      <div className="container-fluid" style={{ marginLeft: useSelector((state) => state.sidebar.open) ? "70px" : "260px", transition: "margin-left 0.3s ease" }}>
        <Header />

        <div className="card shadow rounded p-4 mt-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <input
              type="search"
              className="form-control w-25"
              placeholder="Search by name or department"
              value={textFilter}
              onChange={(e) => setTextFilter(e.target.value)}
              ref={searchRef}
            />
            {actionsMemo}
          </div>

          <DataTable
            columns={columns}
            data={filteredEmployees}
            pagination
            highlightOnHover
            responsive
            selectableRows
            onSelectedRowsChange={(e) => setSelectedRow(e.selectedRows)}
            customStyles={{
              headCells: {
                style: {
                  backgroundColor: "#f8f9fa",
                  fontWeight: "bold",
                },
              },
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default EmpDataTable;
