import React, { useState, useEffect, Fragment } from 'react';


export default function Header(props) {
    return (
        <Fragment>
            <header className="bg_dark header-area">
                <div className="header-nav">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="main_page">
                                    <div className="navigation">
                                        <nav className="navbar navbar-expand-lg navbar-light ">
                                            <button className="btn menu-btn" id="menubtn" onClick={()=>props.handleSidebar()}>
                                                {" "}
                                                <span className= {!props.menuShow ?"fas fa-bars":"fas fa-times"} />{" "}
                                            </button>
                                            <div
                                                className="collapse navbar-collapse sub-menu-bar"
                                                id="navbarSupportedContent"
                                            ></div>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>



        </Fragment>
    )

}