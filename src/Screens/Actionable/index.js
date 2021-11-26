import React, { useContext, useEffect, useState } from 'react';
import ActionableSCreen from './Component/actionable';
import EndPoints from '../utils/apiEndPoints';
import { apiCall } from '../utils/httpClient';
import Loader from '../../component/Loader';
import { QuestionContext } from '../../Context/QuestionContext'
const Actionable = (props) => {
    const [auditorId, setauditorId] = useState('');
    const [isloading, setisloading] = useState(false)
    const [questionList, setquestionList] = useState([])
    const [question, setquestion] = useContext(QuestionContext)
    useEffect(() => {
        handleActionable(props.match.params.id)
    }, [])
    const handleActionable = async (audit_id) => {
        try {
            setisloading(true)
            const params = { audit_id: audit_id, type: 1 }
            const { data } = await apiCall('post', EndPoints.ACTIONABLEDETAIL, params)
            if (data.status = 200) {
                setquestionList(data.data)
                setisloading(false)
            } else {
                setisloading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleQuestion = (item) => {
        setquestion(item)
    }
    return (
        <>
            {isloading && <Loader />}
            <ActionableSCreen
                questionList={questionList}
                handleQuestion={handleQuestion}
            />

        </>)
}

export default Actionable;