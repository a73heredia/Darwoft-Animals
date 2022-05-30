import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css";
import Data from "./Data";
import imag from '../../images/huella.png';

const PrivateScreen = ({ history }) => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    const userName = localStorage.getItem('user');
    useEffect(() => {
        const fetchPrivateDate = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            };

            try {
                const { data } = await axios.get("/api/private", config);
                setPrivateData(data.data);
            } catch (error) {
                localStorage.removeItem("authToken");
                setError("You are not authorized please login");
            }
        };

        fetchPrivateDate();
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        history.push('/login')
    }

    return error ? (
        <span className="error-message">{error}</span>
    ) : (
        <>
            {/*    <div style={{ background: 'green', color: 'white' }}> {privateData} {userName}
            </div> */}


            <Data />
        </>

    );
};

export default PrivateScreen;