import React from 'react';
import Header from '../../Common/Header';

const ScoreScreen = () => {

  return (
    <>
      <Header />
      <div>
        <div className="sidebarWrap">
          <nav className="sidebar">
            <div className="sidebar-box">
              <div className="text"><img src="assets/images/logo.png" style={{ width: '60%' }} /></div>
              <ul className="main_side">
                <li className="active"><a href="#"><i className="fas fa-columns" /> Dashboard</a></li>
                <li> <a href="#"><i className="fa fa-sign-out"> </i> Logout</a></li>
              </ul>
            </div>
          </nav>
        </div>
        <section className="score-area ">
          <div className="container ">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="main_page mt-3 mb-3 p-1">
                  <div className="card card--box">
                    <div className="score-card">
                      <div className="score--heading">
                        <h2 className="score-title">
                          Total Branch <br /> Merchandising Audit Score
                  </h2>
                      </div>
                      <div className="score--count">
                        <div className="score-res-box">
                          <h2 className="score">100</h2>
                          <span>Audit Score</span>
                        </div>
                      </div>
                      <div className="previous--score">
                        <label>Previous Audit Score:</label>
                        <ul className="prvs--scr-list">
                          <li className="prvs--scr-box">
                            <span className="text-primary"> Score : 83</span>
                            <span>01/10/2021</span>
                          </li>
                          <li className="prvs--scr-box">
                            <span className="text-primary">Score : 83</span>
                            <span>01/10/2021</span>
                          </li>
                        </ul>
                        <p>Thank You for your time for this audit</p>
                        <div className="score--btn-box mb-3 mt-4">
                          <button className="score--btn" href="#">Home</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ScoreScreen;