import React, { useState, useEffect } from 'react';
import Header from '../../Common/Header';
import Sidebar from '../../Common/Sidebar/Sidebar';
import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const NotifyScreen = (props) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
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
  const [menuShow, setMenushow] = useState(false);

  const handleSidebar = () => {
    setMenushow(!menuShow)
  }

  useEffect(() => {
    captureimg();
    startBasicCall();
    return (() => {
      // alert("called")
      leaveCall();
    })
  }, [])


  const rtc = {
    // For the local client.
    client: null,
    // For the local audio and video tracks.
    localAudioTrack: null,
    localVideoTrack: null,
  };
  const options = {
    // Pass your app ID here.
    appId: "b13f7540466747e6a102327255673a59",
    // Set the channel name.
    channel: props.channel,
    // Pass a token if your project enables the App Certificate.
    //token:null,
    token: props.token,
  };


  async function startBasicCall() {
    /**
    *
    *
    * Put the following code snippets here.
    */
    rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });
    const uid = await rtc.client.join(options.appId, options.channel, options.token, null);
    // Create an audio track from the audio sampled by a microphone.
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // Create a video track from the video captured by a camera.
    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    // Publish the local audio and video tracks to the channel.
    var d = await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
    console.log("publish success!", d);

    const remoteVideoTrack = rtc.localVideoTrack;
    const playerContainer = document.getElementById("player");
    // Specify the ID of the DIV container. You can use the `uid` of the remote user.
    playerContainer.style.width = "100%";
    playerContainer.style.height = "480px";
    remoteVideoTrack.play(playerContainer);
    rtc.client.on("user-published", async (user, mediaType) => {
      // Subscribe to a remote user.
      await rtc.client.subscribe(user, mediaType);
      props.setonline(true);
      console.log("user", user)
      // If the subscribed track is video.
      if (mediaType === "video") {
        // Get `RemoteVideoTrack` in the `user` object.
        const remoteVideoTrack = user.videoTrack;
        // Dynamically create a container in the form of a DIV element for playing the remote video track.
        const playerContainer = document.createElement("div");
        // Specify the ID of the DIV container. You can use the `uid` of the remote user.
        playerContainer.id = user.uid.toString();
        playerContainer.style.width = "0px";
        playerContainer.style.height = "0px";
        document.body.append(playerContainer);
        // Play the remote video track.
        // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
        remoteVideoTrack.play(playerContainer);
       

        // Or just pass the ID of the DIV container.
        // remoteVideoTrack.play(playerContainer.id);
      }

      // If the subscribed track is audio.
      if (mediaType === "audio") {
        // Get `RemoteAudioTrack` in the `user` object.
        const remoteAudioTrack = user.audioTrack;
        // Play the audio track. No need to pass any DOM element.
        remoteAudioTrack.play();
      }
    });
  }

  const switchCamera = async () => {
    props.setFront(!props.front);
    var cameraMediaOptions = {
      audio: false,
      video: props.front ? "user" : "environment",
    };
    var cameraStream = await navigator.mediaDevices.getUserMedia(cameraMediaOptions);
    // if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    //   console.log("enumerateDevices() not supported.");
    //   return;
    // }

    // // List cameras and microphones.

    // navigator.mediaDevices.enumerateDevices()
    //   .then(function (devices) {
    //     var videoDevices = [0,0];
    //     var videoDeviceIndex = 0;
    //     devices.forEach(function (device) {
    //       console.log("devices", devices)
    //       console.log(device.kind + ": " + device.label +
    //         " id = " + device.deviceId);
    //         if (device.kind == "videoinput") {  
    //           videoDevices[videoDeviceIndex++] =  device.deviceId;    
    //       }
    //     });

    //   })
    //   .catch(function (err) {
    //     console.log(err.name + ": " + err.message);
    //   });
  }
  const captureimg = () => {
    const player = document.getElementById('player1');
    var media = navigator.mediaDevices
      .getUserMedia({ video: { facingMode: (props.front ? "user" : "environment") } })
      .then((stream) => {
        console.log("stream", stream)
        player.srcObject = stream;
      }).catch(error => {
        console.error('Can not get an access to a camera...', error);
      });

    console.log("media", media);

  }




  const splitImages = (image_taken) => {
    let splitImg = image_taken.split(',');
    return splitImg
  }

  async function leaveCall() {
    // Destroy the local audio and video tracks.
    if (rtc.localAudioTrack != null || rtc.localVideoTrack != null) {
      rtc.localAudioTrack.close();
      rtc.localVideoTrack.close();
      // Leave the channel.
      await rtc.client.leave();
    }

  }




  return (
    <>
      <Header handleSidebar={handleSidebar} menuShow={menuShow} />
      {menuShow ?
        <Sidebar /> : null}
      <div>

        <section className="branch-area ">
          <div className="container ">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="branch-content main_page branch_ld_content mt-4">
                  <div className="branch-img-box p-3" >
                    <div id="player" style={{ zIndex: "9999", position: 'relative' }}>
                    </div>
                    <div style={{ position: 'absolute', zIndex: 0, top: '81px' }}>
                      <video id="player1" autoPlay style={{ position: "absolute", width: "92%", zIndex: '0' }} ></video>
                      <canvas id="output" style={{ width: "92%", zIndex: '1' }} ></canvas>
                    </div>
                    <button><i class="fas fa-camera"></i></button>
                  </div>
                  <div>
                    {/* <input type="button" >
                     <img src="/assets/images/voice-recording.png" alt="" className="branch--img" />
                    </input> */}
                    {/* <button href="#" className="brnc--call-btn">Auditor Will Start The Call</button> */}
                  </div>
                  {props.auditStart ?
                    <section>
                      <div>
                        <div>
                          <div>
                            <div>
                              <div className="container">
                                <p className="cll-img--hading">{props.question.audit_question}</p>
                                <button onClick={() => switchCamera()}>Swtich camera</button>
                                {props.question.image_capture == 1 && props.imagePreview ?
                                  // <Carousel>
                                  //   {props.question?.image_taken
                                  //     && splitImages(props.question?.image_taken).map((item, i) > {
                                  //       return (
                                  //         <div className="branch-img-box p-3">
                                  //           <img key={i} src={props.imgurl + item} className="branch--img" style={{ width: 200 }} />
                                  //         </div>
                                  //       )
                                  //     })
                                  //   }
                                  //   {/* <img src={props.imgurl + props.question.image_taken} className="branch--img" /> */}
                                  // </Carousel>
                                  <Carousel responsive={responsive} infinite={true} showDots={true}>
                                    {props.imagePreview.map((item, i) => {
                                      return (
                                        <div className="branch-img-box p-3">
                                          <img key={i} src={props.imgurl + item.image_data} className="branch--img" style={{ width: 200 }} />
                                        </div>
                                      )
                                    })
                                    }
                                  </Carousel>
                                  : null}

                              </div>
                              <div className="call--rating-box">
                                <form>
                                  {
                                    props.question.score_range == 1 ?
                                      <div className="rating-text">
                                        <label className="form-title">Rating: <span>{props.rating}</span></label>
                                      </div> : null
                                  }
                                  {/* <div className="form-group">
                                  <label className="form-title">Actionable</label>
                                  <select className="form-control select--action-bh">
                                    <option className>BH/RMM/AC</option>
                                    <option className>BH/RMM/AC</option>
                                    <option className>BH/RMM/AC</option>
                                  </select>
                                </div> */}
                                  {
                                    props.question.remark == 1 ?
                                      <div className="form-group">
                                        <label className="form-title">Remarks</label>
                                        <textarea className="form-control call--remarks" value={props.remark} rows={3} />
                                      </div>
                                      : null
                                  }
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section> :
                    <div className="main--titile-box">
                      <h4 className="call--title">Team ready for the call :</h4>
                      <div className="bnc-fom-listing-box">
                        <ul className="bnc-fom-list-menu">
                          <li className="bnc-fom-link"><span>Branch Manager Name(You)</span><small className="text-success">Joined</small> </li>
                          <li className="bnc-fom-link"><span>RMM</span><small><a className="cl-ofline--btn" href="#">{props.online ? "Online" : "Offline"}</a> </small> </li>
                          {/* <li className="bnc-fom-link"><span>RMM</span><small><a className="cl-ofline--btn" href="#">{props.online?"Online":"Offline"}</a> <a href className="notif-btn">Notify</a> </small> </li> */}
                          {/* <li className="bnc-fom-link"><span>Admin Name</span > <small className="text-success">Joined</small> </li> /} */}
                        </ul>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* {props.imagePreview &&
          <section>
            <div className="container ">
            <Carousel>
                {props.imagePreview.map((item, i) => {
                  return (
                    <div className="branch-img-box p-3">
                      <img key={i} src={props.imgurl + item.image_data} className="branch--img" style={{ width: 200 }} />
                    </div>
                  )
                })
                }
              </Carousel>
            </div>


          </section>} */}
        {/* <button onClick={() => captuepic()}>click picture</button> */}
        {/* <canvas id="output" style={{ position: "absolute", width: "590px" }} ></canvas> */}
      </div>
    </>
  );
}

export default NotifyScreen;