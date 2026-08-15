import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegisterComponent.css";

import loginBg from "../assets/login-bg.jpg";

const RegisterComponent = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        if (!username || !email || !password) {
            setError("Please fill in all fields");
            return;
        }

        try {

            setLoading(true);

            const response = await axios.post(
                "http://localhost:9090/api/auth/register",
                {
                    username: username,
                    email: email,
                    password: password
                }
            );

            console.log("Registration response:", response.data);

            if (
                typeof response.data === "string" &&
                response.data.toLowerCase().includes("already")
            ) {
                setError(response.data);
                return;
            }

            setMessage("Account created successfully!");

            setTimeout(() => {
                navigate("/login");
            }, 1200);

        } catch (error) {

            console.error("Registration error:", error);

            if (error.response) {
                setError(
                    typeof error.response.data === "string"
                        ? error.response.data
                        : "Registration failed"
                );
            } else {
                setError("Unable to connect to server");
            }

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="register-page">

            {/* LEFT IMAGE */}

            <div
                className="register-image-section"
                style={{
                    backgroundImage: `url(${loginBg})`
                }}
            >

                <div className="register-image-overlay"></div>

                <div className="register-brand-content">

                    <div className="register-brand-logo">
                        EMS
                    </div>

                    <h1>
                        Join Our
                        <br />
                        Employee
                        <br />
                        Management
                        <br />
                        System
                    </h1>

                    <p>
                        Create your account and start
                        managing your employee records.
                    </p>

                </div>

            </div>


            {/* RIGHT REGISTER */}

            <div className="register-form-section">

                <div className="register-card">

                    <div className="register-heading">

                        <h2>Create Account</h2>

                        <p>
                            Create your EMS account
                        </p>

                        <div className="register-heading-line"></div>

                    </div>


                    <form onSubmit={handleRegister}>

                        {/* USERNAME */}

                        <div className="register-input-group">

                            <label>
                                Username
                            </label>

                            <div className="register-input-wrapper">

                                <span className="register-input-icon">
                                    👤
                                </span>

                                <input
                                    type="text"
                                    placeholder="Choose a username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    autoComplete="username"
                                />

                            </div>

                        </div>


                        {/* EMAIL */}

                        <div className="register-input-group">

                            <label>
                                Email Address
                            </label>

                            <div className="register-input-wrapper">

                                <span className="register-input-icon">
                                    ✉
                                </span>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    autoComplete="email"
                                />

                            </div>

                        </div>


                        {/* PASSWORD */}

                        <div className="register-input-group">

                            <label>
                                Password
                            </label>

                            <div className="register-input-wrapper">

                                <span className="register-input-icon">
                                    🔒
                                </span>

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    autoComplete="new-password"
                                />

                                <button
                                    type="button"
                                    className="register-password-toggle"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? "🙈" : "👁"}
                                </button>

                            </div>

                        </div>


                        {/* SUCCESS */}

                        {message && (
                            <div className="register-success">
                                {message}
                            </div>
                        )}


                        {/* ERROR */}

                        {error && (
                            <div className="register-error">
                                {error}
                            </div>
                        )}


                        {/* CREATE BUTTON */}

                        <button
                            type="submit"
                            className="register-button"
                            disabled={loading}
                        >

                            {loading ? (
                                <>
                                    <span className="register-spinner"></span>
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    Create Account
                                    <span className="register-arrow">
                                        →
                                    </span>
                                </>
                            )}

                        </button>

                    </form>


                    {/* LOGIN */}

                    <div className="already-account">

                        <span>
                            Already have an account?
                        </span>

                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default RegisterComponent;