import React, { useState } from 'react'
export const AgoraContext=React.createContext();
export const AgoraProvider=(props)=>{
    const [token, settoken] = useState('')
    const [channel, setchannel] = useState('')
    return(
        <AgoraContext.Provider value={[token, settoken,channel, setchannel]}>
            {props.children}
        </AgoraContext.Provider>
    )
}