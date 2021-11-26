import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../Common/Header';
import Sidebar from '../../Common/Sidebar/Sidebar';

const ActionableSCreen = (props) => {
  const history = useHistory();
  const [menuShow, setMenushow] = useState(false);
  const handleSidebar = () => {
    setMenushow(!menuShow)
  }
  return (
    <>
      <Header handleSidebar={handleSidebar} menuShow={menuShow} />
      {menuShow ?
        <Sidebar /> : null}
      <section className="audit-area ">
        <div className="container ">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="audit-content audit_ld_content">
                <div className>
                  <div className="top--title">
                    <a onClick={() => history.goBack()}> <i class="fas fa-arrow-left"></i> Back</a>
                    <h5 className="title">Audits Actions By:</h5>
                  </div>
                </div>
                <div className="main--titile-box">
                  <div className="headdin--box">
                    <span>Branch Manager</span>
                  </div>
                  <div className="manag--listing-box">
                    <ul className="manag--list-menu">
                      {props.questionList && props.questionList.map((item, index) => (
                        item ?
                          <li className="manag--link actioanble">
                            <Link to="/actionquestion" onClick={() => props.handleQuestion(item)}>{item.audit_question.substring(0, 200)}</Link>
                            <p style={{ color: "gray" }}>Remark:{item.remark}</p>
                          </li> : null))}

                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>



  )


}

export default ActionableSCreen;