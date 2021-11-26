import React, { useState } from 'react';
import Header from '../../Common/Header';
import Sidebar from '../../Common/Sidebar/Sidebar';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './styles.css'
import { useHistory } from 'react-router-dom';
const QuestionScreen = (props) => {
  const [menuShow, setMenushow] = useState(false);
  const history = useHistory();
  const handleSidebar = () => {
    setMenushow(!menuShow)
  }
  const { question } = props
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <>
      <Header handleSidebar={handleSidebar} menuShow={menuShow} />
      <div>
        {menuShow ?
          <Sidebar /> : null}
        <section className="branch-area ">
          <div className="container ">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="branch-content main_page branch_ld_content mt-3">
                  <a onClick={() => history.goBack()}> <i class="fas fa-arrow-left"></i> Back</a>
                  <div className="branch-img-box p-3">
                    <h3>{question?.question_title}</h3>
                    <p className="cll-img--hading">{question?.audit_question}</p>

                    {
                      props.question?.img_capture == 1 && question.image_capture &&
                      <Carousel responsive={responsive} infinite={true} showDots={true}>
                        {question?.image_capture.map(img => (
                          <div style={{ justifyContent: "center", alignItems: "center" }}>
                            <img style={{ width: "600px", height: "300px" }} src={question?.base_url + img} />
                          </div>
                        ))}
                      </Carousel>
                    }
                  </div>
                  <div className="call--rating-box">
                    <form>
                      {
                        question?.score_range >= 1 &&
                        <div className="rating-text">
                          <label className="form-title">Rating : <span>{question?.score_range}</span> </label>
                          {/* <div className="main" >
                            <div className="range">
                              <p style={{ color: "#fff" }}>Min: {question?.score_range_from}</p>
                              <p className="prog">Current: {question?.score_range}</p>
                            </div>
                            <p>Max: {question?.score_range_to}</p>
                          </div> */}
                        </div>
                      }
                      {
                        question?.remark &&
                        <div className="form-group">
                          <label className="form-title">Remarks</label>
                          <textarea className="form-control call--remarks" rows={3} disabled value={question?.remark} />
                        </div>
                      }
                      <div className="score--btn-box mb-3 mt-4">
                        <button onClick={() => props.handleNext()} className="score--btn" href="#">Next</button>
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