import React, { useContext, useEffect, useState } from 'react';
import NotifyScreen from './Component/notify';
import EndPoints from '../utils/apiEndPoints';
import { apiCall } from '../utils/httpClient';
import { useParams, useHistory } from 'react-router-dom';
import apiEndPoints from '../utils/apiEndPoints';
import { AgoraContext } from '../../Context/AgoraContext';
import { socket } from '../utils/Client'
const NotifyView = () => {
    let { audit_id } = useParams();
    const history = useHistory();
    const [question, setquestionlist] = useState();
    const [online, setonline] = useState(false);
    var [intervalId, setintervalId] = useState('');
    const [auditStart, setAuditStart] = useState(false);
    const [imgurl, setimgurl] = useState("")
    const [requestData, setrequestData] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [token, settoken, channel, setchannel] = useContext(AgoraContext)
    const [rating ,setRating] = useState(0);
    const [remark ,setremark] = useState('');
    const [front,setFront] =useState(false)
    useEffect(() => {
        // HandleQuestion();
        handleActionable();
        handleUploadimage();
       


    }, [])

    useEffect(() => {
        socket.on('checker', (data) => {
            //console.log("data checker:====> ",data)
            if (data.socketEvent == `checker${audit_id}`) {
                setImagePreview(null)
                handleActionable()
            }
        })
        socket.on('rating_sent', (data) => {
            //console.log("data rating_sent:====> ",data)
            if (data.audit_id == audit_id)
            {
                setRating(data.val);
            }
        })
        socket.on('remark_sent', (data) => {
            //console.log("data rating_sent:====> ",data)
            if (data.audit_id == audit_id)
            {
                setremark(data.val);
            }
        })
        socket.on('startcalling', (data) => {

            if (data.socketEvent == `getQuestionList${audit_id}`) {
               // console.log("test start calling")
               if(data.status==200)
               {
                   setquestionlist(data.data)
                   setimgurl(data.base_url)
                   setAuditStart(true)
                   setRating(0)
                   setremark('')
               }else{
                window.location.assign('/dashboard')
               }
            }
            
        })
        socket.on('completeQuestionAudit', (data) => {
            console.log("completeQuestionAudit",data)
            if (data.audit_id ==audit_id) {
                window.location.assign('/dashboard')
               
            }
            
        })
        socket.on('getpreviousquestion', (data) => {
            console.log("data previousquestion:====> ",data)
           // console.log("getQuestionList",audit_id,":==== ",data.socketEvent)
            if (data.socketEvent == `previousquestion${audit_id}`) {
                console.log("test start calling")
                setquestionlist(data.data)
                setimgurl(data.base_url)
                setAuditStart(true)
                setRating(data.answer.score_range)
                setremark(data.answer.remark)
            }
        })
        socket.on("captureImageAccept", (data, callback) => {
            //console.log("socket captureImageAccept", data)
            // return callback({success:true})
            if (data.socketEvent == `captureImageAccept${audit_id}`) {
                handleUploadimage()
            }
            //uploadIMGDataSocket(data)
        })
    }, [])
    const HandleQuestion = async () => {
        intervalId = window.setInterval(function () {
            // handleActionable();
            handleUploadimage();
        }, 2000);

    }
    const handleActionable = async () => {
        try {
            // const params = { audit_id: audit_id }
            // socket.emit('bmQuestionlist', params, (data) => {
            //     console.log('socket bmQUesion', data)
            //     if (data.status == 200) {
            //         if (data.socketEvent == `bmQuestionlist${audit_id}`) {
            //             setquestionlist(data.data)
            //             setimgurl(data.base_url)
            //             setAuditStart(true)
            //         }

            //     } else if (data.status == 201) {
            //         //  clearInterval(intervalId)
            //         // history.push('/dashboard')
            //     }

            //     else {
            //         //clearInterval(intervalId)
            //         //history.push('/dashboard')
            //     }
            // })

            // socket.emit('previousQuestionList', params, (data) => {
            //     console.log('previousQuestionList', data)
            //     if (data.status == 200) {
            //         if (data.socketEvent == `previousQuestionList${audit_id}`) {
            //             setquestionlist(data.data)
            //             setimgurl(data.base_url)
            //             setAuditStart(true)
            //         }

            //     } else if (data.status == 201) {
            //         //  clearInterval(intervalId)
            //         // history.push('/dashboard')
            //     }

            //     else {
            //         //clearInterval(intervalId)
            //         //history.push('/dashboard')
            //     }
            // })
            // const { data } = await apiCall('post', EndPoints.QUESTIONLIST, params)
            // if (data.status == 200) {
            //     setquestionlist(data.data)
            //     setimgurl(data.base_url)
            //     setAuditStart(true)

            // } else if (data.status == 201) {
            //     //  clearInterval(intervalId)
            //     // history.push('/dashboard')
            // }

            // else {
            //     //clearInterval(intervalId)
            //     //history.push('/dashboard')
            // }
        } catch (error) {
            console.log(error)
        }
    }

    const handleUploadimage = async () => {
        try {
            const params = { audit_id: audit_id }
            socket.emit("getImagedata", params, (data) => {
                //console.log("socket getImagedata uploadmage", data)
                if (data.socketEvent == `getImagedata${audit_id}`) {
                    uploadIMGDataSocket(data)
                }
            })
            // const { data } = await apiCall('post', EndPoints.GETIMAGEREQUEST, params)
            // console.log("data request", data)
            // if (data.status === 200) {
            //     console.log("res 122",data.data[0])
            //     console.log("  if(data.data[0].status===0)",(data.data[0].status===0))
            //     if(data.data[0].status===0){
            //         setrequestData(data.data[0])
            //         // console.log("res",data.data[0])
            //     captuepic(data.data[0].id,data.data[0].question_id);
            // }

            // } else if (data.status == 201) {
            //     //  clearInterval(intervalId)
            //     // history.push('/dashboard')
            // }

            // else {
            //     //clearInterval(intervalId)
            //     //history.push('/dashboard')
            // }
        } catch (error) {
            console.log(error)
        }
    }
    const uploadIMGDataSocket = (data) => {
        if (data.status === 200) {
            //console.log("res 122", data.data[0])
            // console.log("  if(data.data[0].status===0)",(data.data[0].status===0))
            if (data?.data[0]?.status === 0) {
                setrequestData(data.data[0])
                //console.log("socket res", data.data[0])
                captuepic(data.data[0].id, data.data[0].question_id);
            }

        } else if (data.status == 201) {
            //  clearInterval(intervalId)
            // history.push('/dashboard')
        }

        else {
            //clearInterval(intervalId)
            //history.push('/dashboard')
        }
    }
    const captuepic = (id, question_id) => {

        // var c = document.getElementsByClassName("agora_video_player");

        //console.log("test")
        const imageWidth = document.getElementById('player1').offsetWidth;
        const imageHeight = document.getElementById('player1').offsetHeight;
        const outputCanvas = document.getElementById('output');
        const context = outputCanvas.getContext('2d');
        // Make our hidden canvas the same size
        outputCanvas.width = imageWidth;
        outputCanvas.height = imageHeight;

        // Draw captured image to the hidden canvas
        context.drawImage(document.getElementById('player1'), 0, 0, imageWidth, imageHeight);
        outputCanvas.toBlob((blob) => {
            var url = URL.createObjectURL(blob)
            //console.log("url: ", url)

            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
                var base64data = reader.result;
                //console.log("BASE^$", base64data);
                handleCaptureImage(base64data, id, question_id);
            }

        });
    }

    const handleCaptureImage = async (blob, id, question_id) => {

        try {
            console.log("requestData erer", requestData)
            const params = { audit_id: audit_id, question_id: question_id, id: id, image_data: blob }
            socket.emit("updateCaptureimage", params, (data) => {
                //console.log("socket image upload ", data)
                if (data.status == 200) {
                    if (data.socketEvent == `updateCaptureimage${audit_id}`) {
                        setimgurl(data.base_url)
                        setImagePreview(data?.image_data)
                        setrequestData(data.data)
                    }

                } else if (data.status == 201) {
                    //  clearInterval(intervalId)
                    // history.push('/dashboard')
                }

                else {
                    //clearInterval(intervalId)
                    //history.push('/dashboard')
                }
            })
            // console.log("params", params)
            // const { data } = await apiCall('post', EndPoints.CAPTURINIMAGE, params)
            // console.log("data hanlde", data)
            // if (data.status == 200) {
            //     setrequestData(data.data)

            // } else if (data.status == 201) {
            //     //  clearInterval(intervalId)
            //     // history.push('/dashboard')
            // }

            // else {
            //     //clearInterval(intervalId)
            //     //history.push('/dashboard')
            // }
        } catch (error) {
            console.log(error)
        }
    }

    return (<NotifyScreen
        question={question}
        imgurl={imgurl}
        online={online}
        setonline={setonline}
        auditStart={auditStart}
        requestData={requestData}
        imagePreview={imagePreview}
        setrequestData={setrequestData}
        handleCaptureImage={handleCaptureImage}
        token={token}
        channel={channel}
        rating={rating}
        remark={remark}
        front={front}
        setFront={setFront}
    />)
}

export default NotifyView;