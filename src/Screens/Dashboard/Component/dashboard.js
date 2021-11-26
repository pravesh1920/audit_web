import React, { useEffect, useState } from 'react';
import Header from '../../Common/Header';
import Sidebar from '../../Common/Sidebar/Sidebar';
import moment from 'moment';
import { Link } from 'react-router-dom';

const DashboardScreen = (props) => {
  const [menuShow, setMenushow] = useState(false);
  const handleSidebar = () => {
    setMenushow(!menuShow)
  }
  const datas = props.search.length > 0 ? props.searcharray : props.auditlist;
  return (
    <>
      <Header handleSidebar={handleSidebar} menuShow={menuShow} />
      <div>
        {menuShow ?
          <Sidebar /> : null}
        <div className="modal fade post-job--modal" id="post-job" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="container">
            <div className="modal-dialog">
              <div className="modal-content  tab-content">
                <div className="tab-pane active" id="activity">
                  <div className="modal-content modal_content_box">
                    <div className="csl--mdl-header bdr0 bdr0 modal_header bdr0 ">
                      <span />
                      <span className="csl-mdl-title">Cancel Audit</span>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="info-box checkt_box text-center pl-3 pr-3 pt-3 pb-3">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                      </div>
                      <div className="info-box checkt_box text-center pt-3 pb-3">
                        <textarea rows={4} className="modl-textarea" defaultValue={""} />
                      </div>
                      <div className="text-center mt-3 mb-4  ">
                        <a className="btn-primary cancel--btn" href="#" data-toggle="tab" style={{ width: '140px' }}>Cancel</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="audit-area ">
          <div className="container ">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="audit-content audit_ld_content">
                  <div className="audit--top-search">
                    <div className="adt--search">
                      <div className="input-group">
                        <div className="form-outline text-left search--box">
                          <a href="#" className="adt--search-btn"><i className="fas fa-search" /></a>
                          <input type="search"
                            id="form1"
                            placeholder="Search"
                            className="form-control apt--search-text"
                            value={props.search}
                            onChange={(e) => props.handleSearch(e.target.value)
                            } />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="adt--link-menu">
                    <div className="adt-tab-bar Regular shadow pl-2 pr-2">
                      <ul className="adt-tab-menu">
                        <li className="tab--link"><a className={props.tab == 1 ? "active" : ""} onClick={() => props.handleTab(1)}>Today's Audit</a></li>
                        <li className="tab--link"><a className={props.tab == 2 ? "active" : ""} onClick={() => props.handleTab(2)} >Upcoming Audit</a></li>
                        <li className="tab--link"><a className={props.tab == 3 ? "active" : ""} onClick={() => props.handleTab(3)}>Open Audit</a></li>
                        <li className="tab--link"><a className={props.tab == 4 ? "active" : ""} onClick={() => props.handleTab(4)}>Completed Audit</a></li>
                        {/* <li className="tab--link"><a className={props.tab == 4 ? "active" : ""} onClick={() => props.handleTab(5)}>Cancelled Audit</a></li> */}
                      </ul>
                    </div>
                  </div>
                  <div className="audit--main-box main--page">
                    {props.tab == 1 ?
                      <div className="audit--list">
                        {
                          datas ?
                            datas.map(audit => (
                              <div className="audit--card card mt-2 mb-2">
                                <div className="audit--list-countaint">
                                  <div className="adt--lst-head">
                                    <div className="adt--head-text d-flex justify-content-between">
                                      <h5>{audit.branch_name}</h5>
                                      <h5>Bank</h5>
                                    </div>
                                  </div>
                                  <div className="pl-3 pr-3 p-2">
                                    <div className="adt--containt">
                                      <div className="adt-cntn--date d-flex justify-content-between">
                                        <span className="text--date"><img src="assets/images/icone/calendar.png" width="15px;" /> Date : <label>{moment(audit.audit_date, "DD-MM-YYYY").format('DD/MM/YYYY , ddd')}</label></span>
                                        <span className="text--date"><img src="assets/images/icone/clock1.png" width="15px;" />Time : <label>{moment(audit.audit_time, "H-mm").format('h:mm A')}</label></span>
                                      </div>
                                      <div className="text-left adt--text">
                                        <small>Auditor Name</small>
                                        <span> {audit.auditor_name}</span>
                                      </div>
                                      <div className="d-flex justify-content-between p-1">
                                        <div className="text-left adt--text">
                                          <small>Actionable No.</small>
                                          <span>02 Members</span>
                                        </div>
                                        <div className="text-left adt--text">
                                          <small>Audit Status</small>
                                          <span>{audit.audit_type===1 ? "Online Audit" : "Offline Audit"}</span>
                                        </div>
                                      </div>
                                      <div className="d-flex justify-content-between p-1">
                                        <div className="text-left adt--text">
                                          <small>City</small>
                                          <span>{audit.city_name}</span>
                                        </div>
                                        <div className="text-left adt--text">
                                          {/* <a href="#" className="adt--list-btn-cnsl mt-2" data-toggle="modal" data-target="#post-job">Cancel Audit</a> */}
                                          {audit.audit_type ===1? <Link to={`/welcomeaudit/${audit.audit_id}`} className="adt--list-btn-acept mt-2">Start</Link>:null}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )) : null}
                      </div> : null}
                    {props.tab == 2 ?
                      <div className="audit--list">
                        {
                          datas ?
                            datas.map(audit => (
                              <div>
                                <div>
                                  <p>{moment(audit.date, 'DD-MM-YYYY').format('DD MMMM,YYYY')}</p>
                                </div>
                                {
                                  audit?.items && audit?.items.map(item => (
                                    <div className="audit--card card mt-2 mb-2">
                                      <div className="audit--list-countaint">
                                        <div className="adt--lst-head">
                                          <div className="adt--head-text d-flex justify-content-between">
                                            <h5>{item.branch_name}</h5>
                                            <h5>Bank</h5>
                                          </div>
                                        </div>
                                        <div className="pl-3 pr-3 p-2">
                                          <div className="adt--containt">
                                            <div className="adt-cntn--date d-flex justify-content-between">
                                              <span className="text--date"><img src="assets/images/icone/calendar.png" width="15px;" /> Date : <label>{moment(item.audit_date, "DD-MM-YYYY").format('DD/MM/YYYY , ddd')}</label></span>
                                              <span className="text--date"><img src="assets/images/icone/clock1.png" width="15px;" />Time : <label>{moment(item.audit_time, "H-mm").format('h:mm A')}</label></span>
                                            </div>
                                            <div className="text-left adt--text">
                                              <small>Auditor Name</small>
                                              <span> {item.auditor_name}</span>
                                            </div>
                                            <div className="d-flex justify-content-between p-1">
                                              <div className="text-left adt--text">
                                                <small>Actionable No.</small>
                                                <span>02 Members</span>
                                              </div>
                                              <div className="text-left adt--text">
                                                <small>Audit Status</small>
                                                <span>{item.audit_type ===1? "Online Audit" : "Offline Audit"}</span>
                                              </div>
                                            </div>
                                            <div className="d-flex justify-content-between p-1">
                                              <div className="text-left adt--text">
                                                <small>City</small>
                                                <span>{item.city_name}</span>
                                              </div>
                                              <div className="text-left adt--text">
                                                {/* <a href="#" className="adt--list-btn-cnsl mt-2" data-toggle="modal" data-target="#post-job">Cancel Audit</a> */}
                                               
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                }
                              </div>
                            )) : null}
                      </div> : null}
                    {props.tab == 3 ?
                      <div className="audit--list">
                        {
                          datas ?
                            datas.map(audit => (
                              <div>
                                <div>
                                  <p>{moment(audit.date, 'DD-MM-YYYY').format('DD MMMM,YYYY')}</p>
                                </div>
                                {
                                  audit?.items && audit?.items.map(item => (
                                    <div className="audit--card card mt-2 mb-2">
                                      <div className="audit--list-countaint">
                                        <div className="adt--lst-head">
                                          <div className="adt--head-text d-flex justify-content-between">
                                            <h5>{item.branch_name}</h5>
                                            <h5>Bank</h5>
                                          </div>
                                        </div>
                                        <div className="pl-3 pr-3 p-2">
                                          <div className="adt--containt">
                                            <div className="adt-cntn--date d-flex justify-content-between">
                                              <span className="text--date"><img src="assets/images/icone/calendar.png" width="15px;" /> Date : <label>{moment(item.audit_date, "DD-MM-YYYY").format('DD/MM/YYYY , ddd')}</label></span>
                                              <span className="text--date"><img src="assets/images/icone/clock1.png" width="15px;" />Time : <label>{moment(item.audit_time, "H-mm").format('h:mm A')}</label></span>
                                            </div>
                                            <div className="text-left adt--text">
                                              <small>Auditor Name</small>
                                              <span> {item.auditor_name}</span>
                                            </div>
                                            <div className="d-flex justify-content-between p-1">
                                              <div className="text-left adt--text">
                                                <small>Actionable No.</small>
                                                <span>02 Members</span>
                                              </div>
                                              <div className="text-left adt--text">
                                                <small>Audit Status</small>
                                                <span>{item.audit_type ===1? "Online Audit" : "Offline Audit"}</span>
                                              </div>
                                            </div>
                                            <div className="d-flex justify-content-between p-1">
                                              <div className="text-left adt--text">
                                                <small>City</small>
                                                <span>{item.city_name}</span>
                                              </div>
                                              <div className="text-left adt--text">
                                                {/* <a href="#" className="adt--list-btn-cnsl mt-2" data-toggle="modal" data-target="#post-job">Cancel Audit</a> */}
                                                <Link to={`/actionable/${item.audit_id}`} className="adt--list-btn-acept mt-2">Update</Link>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                }
                              </div>
                            )) : null}
                      </div> : null}
                    {props.tab == 4 ?
                      <div className="audit--list">
                        {
                          datas ?
                            datas.map(audit => (
                              <div>
                                <div>
                                  <p>{moment(audit.date, 'DD-MM-YYYY').format('DD MMMM,YYYY')}</p>
                                </div>
                                {
                                  audit?.items && audit?.items.map(item => (
                                    <div className="audit--card card mt-2 mb-2">
                                      <div className="audit--list-countaint">
                                        <div className="adt--lst-head">
                                          <div className="adt--head-text d-flex justify-content-between">
                                            <h5>{item.branch_name}</h5>
                                            <h5>Bank</h5>
                                          </div>
                                        </div>
                                        <div className="pl-3 pr-3 p-2">
                                          <div className="adt--containt">
                                            <div className="adt-cntn--date d-flex justify-content-between">
                                              <span className="text--date"><img src="assets/images/icone/calendar.png" width="15px;" /> Date : <label>{moment(item.audit_date, "DD-MM-YYYY").format('DD/MM/YYYY , ddd')}</label></span>
                                              <span className="text--date"><img src="assets/images/icone/clock1.png" width="15px;" />Time : <label>{moment(item.audit_time, "H-mm").format('h:mm A')}</label></span>
                                            </div>
                                            <div className="text-left adt--text">
                                              <small>Auditor Name</small>
                                              <span> {item.auditor_name}</span>
                                            </div>
                                            <div className="d-flex justify-content-between p-1">
                                              <div className="text-left adt--text">
                                                <small>Actionable No.</small>
                                                <span>02 Members</span>
                                              </div>
                                              <div className="text-left adt--text">
                                                <small>Audit Status</small>
                                                <span>{item.audit_type ===1? "Online Audit" : "Offline Audit"}</span>
                                              </div>
                                            </div>
                                            <div className="d-flex justify-content-between p-1">
                                              <div className="text-left adt--text">
                                                <small>City</small>
                                                <span>{item.city_name}</span>
                                              </div>
                                              <div className="text-left adt--text">
                                                {/* <a href="#" className="adt--list-btn-cnsl mt-2" data-toggle="modal" data-target="#post-job">Cancel Audit</a> */}
                                                <a href="#" style={{fontSize:15,color:item.audit_status === 3 ? "#11ad2b" : "#e91818"}}>{item.audit_status === 3 ? "Completed" : "Cancelled"}</a>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                }
                              </div>
                            )) : null}
                      </div> : null}
                    {props.tab == 5 ?
                      <div className="audit--list">
                        {
                          datas ?
                            datas.map(audit => (
                              <div>
                                <div>
                                  <p>{moment(audit.date, 'DD-MM-YYYY').format('DD MMMM,YYYY')}</p>
                                </div>
                                {
                                  audit?.items && audit?.items.map(item => (
                                    <div className="audit--card card mt-2 mb-2">
                                      <div className="audit--list-countaint">
                                        <div className="adt--lst-head">
                                          <div className="adt--head-text d-flex justify-content-between">
                                            <h5>{item.branch_name}</h5>
                                            <h5>Bank</h5>
                                          </div>
                                        </div>
                                        <div className="pl-3 pr-3 p-2">
                                          <div className="adt--containt">
                                            <div className="adt-cntn--date d-flex justify-content-between">
                                              <span className="text--date"><img src="assets/images/icone/calendar.png" width="15px;" /> Date : <label>{moment(item.audit_date, "DD-MM-YYYY").format('DD/MM/YYYY , ddd')}</label></span>
                                              <span className="text--date"><img src="assets/images/icone/clock1.png" width="15px;" />Time : <label>{moment(item.audit_time, "H-mm").format('h:mm A')}</label></span>
                                            </div>
                                            <div className="text-left adt--text">
                                              <small>Auditor Name</small>
                                              <span> {item.auditor_name}</span>
                                            </div>
                                            <div className="d-flex justify-content-between p-1">
                                              <div className="text-left adt--text">
                                                <small>Actionable No.</small>
                                                <span>02 Members</span>
                                              </div>
                                              <div className="text-left adt--text">
                                                <small>Audit Status</small>
                                                <span>{item.audit_type ===1? "Online Audit" : "Offline Audit"}</span>
                                              </div>
                                            </div>
                                            <div className="d-flex justify-content-between p-1">
                                              <div className="text-left adt--text">
                                                <small>City</small>
                                                <span>{item.city_name}</span>
                                              </div>
                                              <div className="text-left adt--text">
                                                {/* <a href="#" className="adt--list-btn-cnsl mt-2" data-toggle="modal" data-target="#post-job">Cancel Audit</a> */}
                                                <a href="#" style={{fontSize:15,color:item.audit_status === 3 ? "#11ad2b" : "#e91818"}}>{item.audit_status === 3 ? "Completed" : "Cancelled"}</a>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                }
                              </div>
                            )) : null}
                      </div> : null}
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

export default DashboardScreen;