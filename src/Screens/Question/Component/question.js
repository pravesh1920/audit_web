import React from 'react';
import Header from '../../Common/Header';

const QuestionScreen = () => {

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
        <section className="branch-area ">
          <div className="container ">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="branch-content main_page branch_ld_content mt-3">
                  <div className="branch-img-box p-3">
                    <p className="cll-img--hading">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <img src="assets/images/bank.jpg" className="branch--img" />
                  </div>
                  <div className="call--rating-box">
                    <form>
                      <div className="rating-text">
                        <label className="form-title">Rating</label>
                        <div className="star-rating">
                          <span className="fa fa-star checked" />
                          <span className="fa fa-star checked" />
                          <span className="fa fa-star checked" />
                          <span className="fa fa-star" />
                          <span className="fa fa-star" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-title">Actionable</label>
                        <select className="form-control select--action-bh">
                          <option className>BH/RMM/AC</option>
                          <option className>BH/RMM/AC</option>
                          <option className>BH/RMM/AC</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-title">Remarks</label>
                        <textarea className="form-control call--remarks" rows={3} defaultValue={""} />
                      </div>
                    </form>
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

export default QuestionScreen;