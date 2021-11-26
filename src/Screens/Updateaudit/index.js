import React, { useContext, useEffect, useState } from 'react';
import UpdateActionableSCreen from './Component/Updateaudit';
import { useHistory } from 'react-router-dom';
import EndPoints from '../utils/apiEndPoints';
import { apiCall } from '../utils/httpClient';
import Loader from '../../component/Loader';
import { QuestionContext } from '../../Context/QuestionContext';
import apiEndPoints from '../utils/apiEndPoints';

const UpdateActionable = () => {
    const [isloading, setisloading] = useState(false)
    const [question, setquestion] = useContext(QuestionContext)
   
    const history = useHistory();
    const [images, setimages] = useState([])
    const [remark, setremark] = useState(question?.actionable?.actionable_remark ?question?.actionable?.actionable_remark : '')
    const handleSubmit = async () => {
        setisloading(true)
        // console.log(images[0])
        const formData = new FormData();
        if(images.length > 0) 
        formData.append('image', images[0])
        formData.append('remark', remark)
        formData.append('type', 1)
        formData.append('id', question.id)
        formData.append('audit_id', question.audit_id)
        formData.append('question_id', question.question_id)
        formData.append('actionable_id', question?.actionable?.actionable_id ? question?.actionable?.actionable_id : '')
        const response = await apiCall('POST', apiEndPoints.ACTIONABLE_SUBMIT, formData,
        { Accept: "application/json", "Content-Type": "multipart/form-data", })
        if (response.status === 200) {
            setisloading(false);
            history.push("/dashboard");
        }else{
            setisloading(false)           
        }
    }
    useEffect(() => {
        if (question == undefined || question == 'undefined')
            history.push("/dashboard")
    }, [])
    if (question == undefined || question == 'undefined')
        history.push("/dashboard")
    return (
        <>
            {isloading && <Loader />}
            <UpdateActionableSCreen
                images={images}
                setimages={setimages}
                remark={remark}
                setremark={setremark}
                handleSubmit={handleSubmit}
                question={question}
            />

        </>)
}

export default UpdateActionable;