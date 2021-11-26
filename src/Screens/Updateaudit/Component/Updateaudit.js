import React, { useEffect, useState } from 'react';
import Header from '../../Common/Header';
import Sidebar from '../../Common/Sidebar/Sidebar';
import { useHistory } from 'react-router-dom';
const ActionableSCreen = (props) => {
  const [showIMG, setshowIMG] = useState()
  const history = useHistory();
  const [menuShow, setMenushow] = useState(false);
  const handleSidebar = () => {
    setMenushow(!menuShow)
  }
  const { images, setimages, remark, setremark, handleSubmit } = props
  const handleImage = (evt) => {
    setimages(evt.target.files)
    var url = URL.createObjectURL(evt.target.files[0])
    setshowIMG(url)
  }
  console.log(showIMG)
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
                <div>
                  <div className="form--box">
                    <div className="acti--box">
                      <a onClick={() => history.goBack()}> <i class="fas fa-arrow-left"></i> Back</a>

                      {props.question?.img_capture == 1 ?
                        <div className="acti--containt mt-2 mb-2">
                          <span className="form--lable">Take Picture</span>
                          <div className="acti--image-box" style={{ cursor: "pointer" }}>
                            <input type="file" id="files" accept="image/png, image/jpeg" capture="camera" hidden onChange={e => handleImage(e)} />
                            <label for="files" style={{ width: "100%", cursor: "pointer" }}>
                              {
                                //  images?Object.entries(images).map(img=>{
                                //    return(
                                //      <div key={img[0]} >
                                //     <img src={URL.createObjectURL(img[1])} style={{width:"90px"}}/>
                                //     </div>
                                //   )}
                                //   ):
                                props.question?.actionable?.image ? <img src={props.question?.base_url + props.question?.actionable?.image} style={{ width: "90px" }} /> :
                                  showIMG ? <img src={showIMG} style={{ width: "90px" }} /> :
                                    <img className="select-img" src="assets/images/icone/camera1.png" />
                              }
                            </label>
                          </div>
                        </div>
                        : null}
                      <div className="acti--containt mt-4 mb-2">
                        <span className="form--lable">Remark</span>
                        <div className="acti--rev-">
                          <textarea className="form-control rounded-0 acti--textarea" id rows={4} placeholder="Remark" value={remark} onChange={e => setremark(e.target.value)} />
                        </div>
                      </div>

                    </div>

                    <div className="form-botm--btn">
                      <button className="btn btn-primary btn--submit" onClick={() => handleSubmit()}>Update</button>
                    </div>
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

