import React, { Fragment } from 'react';
import './sidebar.css';
export default function Sidebar(props) {
  const logout = () => {
    localStorage.removeItem("AuthToken");
    localStorage.removeItem("token");
    window.location.assign("/")
  }

  const godashboard =()=>{
    window.location.assign("/dashboard")
  }
  return (
    <Fragment>
      <div style={{ minWidth: "20%", backgroundColor: "#407dec", width: "20%", height: "100%", position: "fixed", zIndex: 999 }}>
        <div style={{ alignItems: "center", width: "100%", display: "flex", margin: "0", flexDirection: "column" }}>
          <img src="/assets/images/logo.png" style={{ width: '60%', padding: 20 }} />
          <ul style={{ textDecoration: "none", listStyle: "none", color: "white", padding: 10 }}>
            <li className="active"><a href="#" onClick={() => godashboard()}>
              <i className="fas fa-columns" style={{ padding: 10 }} />
                   Dashboard</a></li>
            <li> <a href="#" style={{ color: "white", cursor: "pointer" }} onClick={() => logout()}><i className="fa fa-sign-out" style={{ padding: 10 }}  > </i> Logout</a></li>
          </ul>
        </div>
      </div>
    </Fragment>
  )

}