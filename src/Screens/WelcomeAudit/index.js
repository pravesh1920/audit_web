import React, { useContext, useEffect, useState } from 'react';
import WelcomeAuditScreen from './Component/welcomeAudit'
import { useParams, useHistory } from 'react-router-dom';
import { apiCall } from '../utils/httpClient';
import apiEndPoints from '../utils/apiEndPoints';
import { AgoraContext } from '../../Context/AgoraContext';
const WelcomeAuditView = (props) => {
    const [ token,settoken,channel, setchannel] = useContext(AgoraContext)
    let { audit_id } = useParams();
    const history = useHistory();
    useEffect(() => {
      _agoraToken()
    }, [])
    const _agoraToken = async () => {
        try {
            const params = {
                audit_id: audit_id,
            }
            const response = await apiCall("POST", apiEndPoints.AGORA_TOKEN, params)
            // console.log("Token:",response.data.data)
            if (response.status === 200) {
                setchannel(response.data.data.channel)
                settoken(response.data.data.token)
            }
        } catch (error) {
            console.log("ERROR ", error)
        }
    }
    console.log('audit_id: ', audit_id);

    const handlenotify = () => {
        history.push("/notify/" + audit_id);
    }
    return (<WelcomeAuditScreen
        handlenotify={handlenotify}

    />)
}
export default WelcomeAuditView;