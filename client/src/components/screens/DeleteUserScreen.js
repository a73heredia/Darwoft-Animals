import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./DeleteUserScreen.css";

const DeleteUserScreen = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            history.push("/delete");
        }
    }, [history]);

    const deleteHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            const { data } = await axios.delete(
                "/api/auth/deleteUser",
                { email },
                config
            );

            localStorage.setItem("authToken", "");
            localStorage.setItem("user", "");

            history.push("/home");
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <div className="login-screen">
            <form onSubmit={deleteHandler} className="login-screen__form">
                <h3 className="login-screen__title">Delete User</h3>
                {error && <span className="error-message">{error}</span>}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        required
                        id="email"
                        placeholder="Email address"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        tabIndex={1}
                    />
                </div>

                <button type="submit" className="btn btn-primary" tabIndex={3}>
                    Delete
                </button>

                <span className="login-screen__subtext">
                    Go Back? <Link to="/home">Home</Link>
                </span>
            </form>
        </div>
    );
};

export default DeleteUserScreen;