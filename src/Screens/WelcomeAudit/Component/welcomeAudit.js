import React,{useState} from 'react';
import Header from '../../Common/Header';
import Sidebar from '../../Common/Sidebar/Sidebar';
const WelcomeauditScreen = (props) => {

  const [menuShow, setMenushow] = useState(false);
  const handleSidebar = () => {
    setMenushow(!menuShow)
  }
  return (
    <>
     <Header handleSidebar={handleSidebar} menuShow={menuShow} />
      {menuShow ?
        <Sidebar /> : null}
      <section className="start-audit-area ">
        <div className="container ">
          <div className="start-audit-content main_page">
            <div className="start-audit-body pt-3 pb-3">
              <div className="start-audit-main text-center">
                <img src="/assets/images/setting.png" className="image" />
              </div>
              <div className="start-adt-body">
                <center className="start-adt-head">
                  <h2 className="title">Welcome To Online Audit</h2>
                </center>
                <p className="text-c">Following are the online/live audit reqirement. </p>
                <ul className="start--opt-list mb-4">
                  <li><img src="/assets/images/icone/headphones.png" /> Headphone</li>
                  <li><img src="/assets/images/icone/wifi-line.png" /> Good Network</li>
                  <li><img src="/assets/images/icone/volume.png" /> Noise Free surrounding</li>
                </ul>
                <div className="mb-4 mt-4 pt-4">
                  <button onClick={()=>props.handlenotify()} className="btn btn-primary main--btn">Start Audit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default WelcomeauditScreen;