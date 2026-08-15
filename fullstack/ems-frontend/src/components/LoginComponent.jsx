import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginComponent.css";

import loginBg from "../assets/login-bg.jpg";

const LoginComponent = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");

        if (!username || !password) {
            setError("Please enter username and password");
            return;
        }

        try {

            setLoading(true);

            const response = await axios.post(
                "http://localhost:9090/api/auth/login",
                {
                    username: username,
                    password: password
                }
            );

            // Backend returns JWT token as String
            const token = response.data;

            // Save token
            localStorage.setItem("token", token);

            console.log("Login successful");
            console.log("JWT Token:", token);

            // Go to employee list
            navigate("/employees");

        } catch (error) {

            console.error("Login error:", error);

            if (error.response && error.response.status === 401) {
                setError("Invalid username or password");
            } else if (error.response && error.response.status === 403) {
                setError("Access forbidden");
            } else {
                setError("Unable to connect to server");
            }

        } finally {

            setLoading(false);

        }
    };

    const handleRegister = () => {
        navigate("/register");
    };

    return (

        <div className="login-page">

            {/* LEFT IMAGE */}

            <div
                className="login-image-section"
                style={{
                    backgroundImage: `url(${loginBg})`
                }}
            >

                <div className="image-overlay"></div>

                <div className="brand-content">

                    <div className="brand-logo">
                        EMS
                    </div>

                    <h1>
                        Employee
                        <br />
                        Management
                        <br />
                        System
                    </h1>

                    <p>
                        Manage your employees efficiently,
                        securely and effortlessly.
                    </p>

                </div>

            </div>


            {/* RIGHT LOGIN */}

            <div className="login-form-section">

                <div className="login-card">

                    <div className="login-heading">

                        <h2>Welcome Back</h2>

                        <p>
                            Login to your EMS account
                        </p>

                        <div className="heading-line"></div>

                    </div>


                    <form onSubmit={handleLogin}>

                        {/* USERNAME */}

                        <div className="input-group-custom">

                            <label>
                                Username
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon">
                                    👤
                                </span>

                                <input
                                    type="text"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    autoComplete="username"
                                />

                            </div>

                        </div>


                        {/* PASSWORD */}

                        <div className="input-group-custom">

                            <label>
                                Password
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon">
                                    🔒
                                </span>

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    autoComplete="current-password"
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? "🙈" : "👁"}
                                </button>

                            </div>

                        </div>


                        {/* ERROR */}

                        {error && (
                            <div className="login-error">
                                {error}
                            </div>
                        )}


                        {/* FORGOT */}

                        <div className="forgot-password">

                            <button
                                type="button"
                                onClick={() =>
                                    alert(
                                        "Forgot password feature coming soon"
                                    )
                                }
                            >
                                Forgot password?
                            </button>

                        </div>


                        {/* LOGIN BUTTON */}

                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >

                            {loading ? (
                                <>
                                    <span className="login-spinner"></span>
                                    Logging in...
                                </>
                            ) : (
                                <>
                                    Login
                                    <span className="arrow">
                                        →
                                    </span>
                                </>
                            )}

                        </button>

                    </form>


                    {/* DIVIDER */}

                    <div className="divider">

                        <span></span>

                        <p>or continue with</p>

                        <span></span>

                    </div>


                    {/* GOOGLE */}

                    <button
                        type="button"
                        className="google-button"
                        onClick={() =>
                            alert(
                                "Google login will be added later"
                            )
                        }
                    >

                        <span className="google-icon">
                            G
                        </span>

                        Continue with Google

                    </button>


                    {/* REGISTER */}

                    <div className="register-text">

                        <span>
                            Don't have an account?
                        </span>

                        <button
                            type="button"
                            onClick={handleRegister}
                        >
                            Create Account
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default LoginComponent;