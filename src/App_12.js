import React, { useState, useEffect } from 'react';

import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng"
const NotifyScreen = (props) => {

 

  useEffect(() => {
    captureimg();
    startBasicCall();
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
    channel: "itinfo",
    // Pass a token if your project enables the App Certificate.
    //token:null,
    token: "006b13f7540466747e6a102327255673a59IAALfQsoYsHu6idwz1Q7mNJnEUF0nweoSMSZi3t6YMwARnVXpngAAAAAEABr21wC/GSTYQEAAQD4ZJNh",
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
    playerContainer.style.width = "640px";
    playerContainer.style.height = "480px";
    remoteVideoTrack.play(playerContainer);
    console.log("remoteVideoTrack",remoteVideoTrack)
   // console.log("remoteVideoTrack 123",remoteVideoTrack.play(playerContainer))
    rtc.client.on("user-published", async (user, mediaType) => {
      // Subscribe to a remote user.
      await rtc.client.subscribe(user, mediaType);

      console.log("user",user)
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
       // props.setonline(true);

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

  const captureimg = ()=>{
    const player = document.getElementById('player1');
    navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      console.log("stream",stream)
        player.srcObject = stream;
    }).catch(error => {
        console.error('Can not get an access to a camera...', error);
    });

  }

  const captuepic = ()=>{

    // var c = document.getElementsByClassName("agora_video_player");

    // console.log("test",c)
      const imageWidth = document.getElementById('player1').offsetWidth;
      const imageHeight = document.getElementById('player1').offsetHeight;
      const outputCanvas = document.getElementById('output');
      const context = outputCanvas.getContext('2d');
      // Make our hidden canvas the same size
      outputCanvas.width = imageWidth;
      outputCanvas.height = imageHeight;

      // Draw captured image to the hidden canvas
      context.drawImage(document.getElementById('player1'), 0, 0, imageWidth, imageHeight);

      // A bit of magic to save the image to a file
      // const downloadLink = document.createElement('a');
      // downloadLink.setAttribute('download', `capture-${new Date().getTime()}.png`);
      outputCanvas.toBlob((blob) => {
          console.log(blob)
      });




  }






  return (
    <>
     
      <div>

        <section className="branch-area ">
          <div className="container ">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="branch-content main_page branch_ld_content mt-4">
                  <div className="branch-img-box p-3" id="player">
                  <video id="player1" autoPlay style={{position:"absolute",width:"590px"}} ></video>
                     {/* <img src="/assets / images / bank.jpg" className="branch--img" /> */}
                  </div>
                  <div>
                    {/* <button href="#" className="brnc--call-btn">Auditor Will Start The Call</button> */}
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        </section>
        <button onClick={()=>captuepic()}>click picture</button>
        <canvas id="output"></canvas>
      </div>
    </>
  );
}

export default NotifyScreen;