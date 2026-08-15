import React, { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {

        if (id) {
            getEmployee(id).then((response) => {
                setFirstname(response.data.firstname);
                setLastname(response.data.lastname);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error);
            });
        }

    }, [id]);

    function validateForm() {

        let valid = true;

        const errorsCopy = {
            firstname: '',
            lastname: '',
            email: ''
        };

        if (firstname.trim()) {
            errorsCopy.firstname = '';
        } else {
            errorsCopy.firstname = 'First Name is required';
            valid = false;
        }

        if (lastname.trim()) {
            errorsCopy.lastname = '';
        } else {
            errorsCopy.lastname = 'Last Name is required';
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    function saveEmployee(e) {

        e.preventDefault();

        if (validateForm()) {

            const employee = {
                firstname,
                lastname,
                email
            };

            if (id) {

                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigate('/employees');
                }).catch(error => {
                    console.error(error);
                });

            } else {

                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigate('/employees');
                }).catch(error => {
                    console.error(error);
                });

            }

        }
    }

    function pageTitle() {

        if (id) {
            return <h2 className="text-center">Update Employee</h2>;
        } else {
            return <h2 className="text-center">Add Employee</h2>;
        }
    }
        return (
        <div className="container">
            <br />

            <div className="row">
                <div className="card col-md-6 offset-md-3">

                    {pageTitle()}

                    <div className="card-body">

                        <form onSubmit={saveEmployee}>

                            <div className="mb-3">
                                <label className="form-label">
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter First Name"
                                    className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                />

                                {errors.firstname &&
                                    <div className="invalid-feedback">
                                        {errors.firstname}
                                    </div>
                                }
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter Last Name"
                                    className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                />

                                {errors.lastname &&
                                    <div className="invalid-feedback">
                                        {errors.lastname}
                                    </div>
                                }
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                {errors.email &&
                                    <div className="invalid-feedback">
                                        {errors.email}
                                    </div>
                                }
                            </div>

                            <button
                                type="submit"
                                className="btn btn-success"
                            >
                                Submit
                            </button>

                        </form>

                    </div>

                </div>
            </div>

        </div>
    );
};

export default EmployeeComponent;