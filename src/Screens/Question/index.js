import React, { useEffect } from 'react';
import QuestionScreen from './Component/question'
import AgoraRTC from "agora-rtc-sdk-ng";
const QuestionScreenView = () => {
    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    return (<QuestionScreen />)
}
export default QuestionScreenView;