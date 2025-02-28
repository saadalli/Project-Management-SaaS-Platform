'use client'
import { useEffect, useState } from "react";
import Tasks from "./Tasks";

// pages/employee.js
const Employee = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = () => {
            const token = localStorage.getItem("token");

            if (token) {
                try {
                    // Split the JWT into its three parts (header, payload, signature)
                    const [, payload] = token.split(".");

                    // Decode the base64 payload
                    const decodedPayload = JSON.parse(atob(payload));

                    // Set the extracted user data to state
                    setUserData(decodedPayload);
                } catch (error) {
                    console.error("Error decoding token:", error);
                }
            }
        };

        fetchUserData();
    }, []);
    console.log(userData)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
        <Tasks role={userData?.role}/>
      </div>
    );
  };
  
  export default Employee;