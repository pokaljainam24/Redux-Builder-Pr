// SalaryModal.jsx
import { useSelector, useDispatch } from "react-redux";
import { closeSalaryModal } from "../../features/modal/salaryModalSlice";
import { AnimatePresence, motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaFileCsv, FaFilePdf } from "react-icons/fa";
import { useRef } from "react";

const SalaryModal = () => {
    const dispatch = useDispatch();
    const { isOpen, selectedEmployee } = useSelector((state) => state.salaryModal);
    const salarySlips = useSelector((state) => state.salarySlips.salaryArr);
    const slipRef = useRef();

    if (!isOpen || !selectedEmployee) return null;
    const slip = salarySlips.find(s => s.employeesSalarySlip === selectedEmployee.employeeName);

    const basic = parseFloat(selectedEmployee.employeeSalary) || 0;
    const hra = parseFloat(selectedEmployee.hra) || 0;
    const other = parseFloat(selectedEmployee.bonus) || 0;

    const gross = basic + hra + other;
    const pf = basic * 0.12;
    const tax = gross * 0.1;
    const totalDeduction = pf + tax;
    const net = gross - totalDeduction;

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.text("Payslip", 105, 10, null, null, "center");
        doc.text(`Employee: ${selectedEmployee.employeeName}`, 14, 20);
        doc.text(`Month: ${slip.month} ${slip.year}`, 14, 28);
        autoTable(doc, {
            startY: 40,
            head: [["Earnings", "Amount"]],
            body: [
                ["Basic", basic],
                ["HRA", hra],
                ["Other", other],
                ["Gross", gross]
            ],
            headStyles: { fillColor: [100, 200, 100] },
        });
        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            head: [["Deductions", "Amount"]],
            body: [
                ["PF", pf.toFixed(2)],
                ["Tax", tax.toFixed(2)],
                ["Total", totalDeduction.toFixed(2)]
            ],
            headStyles: { fillColor: [200, 100, 100] },
        });
        doc.text(`Net Salary: ₹${net.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 20);
        doc.save(`${selectedEmployee.employeeName}_Payslip.pdf`);
    };

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center z-3">
            <AnimatePresence>
                <motion.div
                    ref={slipRef}
                    className="bg-white rounded-3 shadow p-4"
                    style={{ width: "600px", maxHeight: "90vh", overflowY: "auto" }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="d-flex justify-content-between mb-3">
                        <h5 className="mb-0 text-dark">Payslip – {slip.month} {slip.year}</h5>
                        <button className="btn-close" onClick={() => dispatch(closeSalaryModal())}></button>
                    </div>

                    <div className="border p-3 text-dark rounded mb-3">
                        <p className="mb-1"><strong>Employee Name:</strong> {selectedEmployee.employeeName}</p>
                        <p className="mb-1"><strong>Employee ID:</strong> 1234</p>
                        <p className="mb-1"><strong>Pay Date:</strong> 01/{slip.month}/2023</p>
                        <p className="mb-0"><strong>Department:</strong> {selectedEmployee.department}</p>
                    </div>

                    <div className="row mb-3">
                        <div className="col">
                            <h6 className="text-success">Earnings</h6>
                            <table className="table table-sm">
                                <tbody>
                                    <tr><td>Basic</td><td>₹{basic.toFixed(2)}</td></tr>
                                    <tr><td>HRA</td><td>₹{hra.toFixed(2)}</td></tr>
                                    <tr><td>Other Allowance</td><td>₹{other.toFixed(2)}</td></tr>
                                    <tr className="fw-bold"><td>Total</td><td>₹{gross.toFixed(2)}</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col">
                            <h6 className="text-danger">Deductions</h6>
                            <table className="table table-sm">
                                <tbody>
                                    <tr><td>PF</td><td>₹{pf.toFixed(2)}</td></tr>
                                    <tr><td>Tax</td><td>₹{tax.toFixed(2)}</td></tr>
                                    <tr className="fw-bold"><td>Total</td><td>₹{totalDeduction.toFixed(2)}</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-light p-3 rounded text-end fw-bold text-success">
                        Net Payable: ₹{net.toFixed(2)}
                    </div>

                    <div className="d-flex justify-content-end gap-2 mt-3">
                        <button onClick={handleDownloadPDF} className="btn btn-outline-danger">
                            <FaFilePdf className="me-2" /> Download PDF
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default SalaryModal;
