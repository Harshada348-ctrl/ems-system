import axios from "axios";

const REST_API_BASE_URL = "http://localhost:9090/api/employees";

// Get JWT token from browser
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

// Get all employees
export const listEmployees = () => {
    return axios.get(
        REST_API_BASE_URL,
        getAuthHeaders()
    );
};

// Create employee
export const createEmployee = (employee) => {
    return axios.post(
        REST_API_BASE_URL,
        employee,
        getAuthHeaders()
    );
};

// Get employee by ID
export const getEmployee = (employeeId) => {
    return axios.get(
        REST_API_BASE_URL + "/" + employeeId,
        getAuthHeaders()
    );
};

// Update employee
export const updateEmployee = (employeeId, employee) => {
    return axios.put(
        REST_API_BASE_URL + "/" + employeeId,
        employee,
        getAuthHeaders()
    );
};

// Delete employee
export const deleteEmployee = (employeeId) => {
    return axios.delete(
        REST_API_BASE_URL + "/" + employeeId,
        getAuthHeaders()
    );
};