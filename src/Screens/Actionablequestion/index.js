import React, { useContext, useEffect } from 'react';
import QuestionScreen from './Component/actionablequestion';
import { useHistory } from 'react-router-dom';
import { QuestionContext } from '../../Context/QuestionContext'
const QuestionScreenView = () => {
    const [question, setquestion] = useContext(QuestionContext)
    const history = useHistory();
    useEffect(() => {
        if (question == undefined || question == 'undefined')
            history.push("/dashboard")
    }, [])
    const handleNext = () => {
        history.push("/updateaudit");
    }
    if (question == undefined || question == 'undefined')
        history.push("/dashboard")
    return (<QuestionScreen
        handleNext={handleNext}
        question={question}
    />)
}
export default QuestionScreenView;