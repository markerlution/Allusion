import './LogoutUser.css';
import axios from "axios";
import React, { useEffect } from "react";

function LogoutUser() {

  const getPayload = async () => {
    await axios.get(process.env.REACT_APP_API_URL + "/api/logout/");
    localStorage.removeItem('user');
    localStorage.removeItem('Allusion');
    window.location.href = process.env.REACT_APP_WEB_URL;
  };

  useEffect(() => {
    getPayload();
  }, []);

  return (
    <div className="App-LogoutUser">
      Loging out 
    </div>
  );
}

export default LogoutUser;
