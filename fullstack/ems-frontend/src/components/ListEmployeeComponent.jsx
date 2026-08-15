import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listEmployees, deleteEmployee } from '../services/EmployeeService';

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, []);

    function getAllEmployees() {
        setLoading(true);

        listEmployees()
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function addNewEmployee() {
        navigate('/add-employee');
    }

    function updateEmployee(id) {
        navigate(`/edit-employee/${id}`);
    }

    function removeEmployee(id) {

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this employee?'
        );

        if (!confirmDelete) {
            return;
        }

        deleteEmployee(id)
            .then(() => {
                getAllEmployees();
            })
            .catch((error) => {
                console.error(error);
                alert('Unable to delete employee');
            });
    }

    const filteredEmployees = employees.filter(employee =>
        employee.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container py-4">

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h2 className="fw-bold mb-1">
                        Employees
                    </h2>

                    <p className="text-muted mb-0">
                        Manage your employee records
                    </p>
                </div>

                <button
                    className="btn btn-primary px-4"
                    onClick={addNewEmployee}
                >
                    + Add Employee
                </button>

            </div>


            {/* Statistics */}
            <div className="row g-3 mb-4">

                <div className="col-md-4">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body">

                            <p className="text-muted mb-1">
                                Total Employees
                            </p>

                            <h3 className="fw-bold mb-0">
                                {employees.length}
                            </h3>

                        </div>

                    </div>

                </div>


                <div className="col-md-4">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body">

                            <p className="text-muted mb-1">
                                Search Results
                            </p>

                            <h3 className="fw-bold mb-0">
                                {filteredEmployees.length}
                            </h3>

                        </div>

                    </div>

                </div>


                <div className="col-md-4">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body">

                            <p className="text-muted mb-1">
                                System Status
                            </p>

                            <h3 className="fw-bold text-success mb-0">
                                ● Active
                            </h3>

                        </div>

                    </div>

                </div>

            </div>


            {/* Employee Table Card */}
            <div className="card border-0 shadow-sm">

                <div className="card-body p-4">

                    {/* Search */}
                    <div className="row mb-4">

                        <div className="col-md-6">

                            <div className="input-group">

                                <span className="input-group-text bg-white">
                                    🔍
                                </span>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search employees..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />

                            </div>

                        </div>

                    </div>


                    {/* Loading */}
                    {loading ? (

                        <div className="text-center py-5">

                            <div
                                className="spinner-border text-primary"
                                role="status"
                            >
                            </div>

                            <p className="text-muted mt-3">
                                Loading employees...
                            </p>

                        </div>

                    ) : filteredEmployees.length === 0 ? (

                        /* Empty State */
                        <div className="text-center py-5">

                            <div
                                style={{
                                    fontSize: '50px'
                                }}
                            >
                                👥
                            </div>

                            <h5 className="mt-3">
                                No employees found
                            </h5>

                            <p className="text-muted">
                                Try another search or add a new employee.
                            </p>

                            <button
                                className="btn btn-primary"
                                onClick={addNewEmployee}
                            >
                                + Add Employee
                            </button>

                        </div>

                    ) : (

                        /* Table */
                        <div className="table-responsive">

                            <table className="table align-middle">

                                <thead className="table-light">

                                    <tr>

                                        <th>ID</th>

                                        <th>Employee</th>

                                        <th>Email</th>

                                        <th>Status</th>

                                        <th className="text-end">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredEmployees.map(employee => (

                                        <tr key={employee.id}>

                                            <td className="fw-semibold">
                                                #{employee.id}
                                            </td>


                                            {/* Employee */}
                                            <td>

                                                <div className="d-flex align-items-center">

                                                    <div
                                                        className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-3"
                                                        style={{
                                                            width: '42px',
                                                            height: '42px',
                                                            fontWeight: 'bold'
                                                        }}
                                                    >
                                                        {employee.firstname
                                                            ?.charAt(0)
                                                            .toUpperCase()}
                                                    </div>

                                                    <div>

                                                        <div className="fw-semibold">
                                                            {employee.firstname}{' '}
                                                            {employee.lastname}
                                                        </div>

                                                        <small className="text-muted">
                                                            Employee
                                                        </small>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* Email */}
                                            <td>
                                                {employee.email}
                                            </td>


                                            {/* Status */}
                                            <td>

                                                <span className="badge bg-success-subtle text-success">
                                                    Active
                                                </span>

                                            </td>


                                            {/* Actions */}
                                            <td className="text-end">

                                                <button
                                                    className="btn btn-sm btn-outline-primary me-2"
                                                    onClick={() =>
                                                        updateEmployee(
                                                            employee.id
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() =>
                                                        removeEmployee(
                                                            employee.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
};

export default ListEmployeeComponent;