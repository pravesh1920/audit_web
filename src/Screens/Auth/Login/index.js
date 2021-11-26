import React, { useState, useRef, useEffect } from 'react';
import Loginscreen from './Component/login'
import SimpleReactValidator from 'simple-react-validator';
import EndPoints from '../../utils/apiEndPoints';
import { apiCall, setDefaultHeader } from '../../utils/httpClient';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../component/Context/context';
import { setCookie, getCookie, eraseCookie } from '../../../component/Cookies';
import Loader from '../../../component/Loader';


const Loginview = () => {

    const { signIn, setRememberMe, rememberData } = React.useContext(AuthContext);
    const simpleValidator = useRef(new SimpleReactValidator())
    const [errorMessage, setErrorMessage] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toperror, setToperror] = useState(false);
    const [, forceUpdate] = useState();
    const [isRemember, setIsRemember] = useState(rememberData()?.isRemember);
    const history = useHistory();
    const [isloading, setisloading] = useState(false)
    useEffect(() => {
        if (isRemember) {
            const email = getCookie('email');
            setEmail(email);
            const pass = getCookie('password');
            setPassword(pass);
        } else {
            eraseCookie('email')
            eraseCookie('password')
        }
        const authval = localStorage.getItem('AuthToken')
        if (authval) {
            window.location.assign("/dashboard")
        }
    }, [])

    function validateAllField() {
        if (simpleValidator.current.allValid()) {
            return true;
        } else {
            simpleValidator.current.showMessages(true);
            forceUpdate(1)
            return false;
        }
    }

    const usersignin = async () => {
        const isValid = validateAllField()
        if (isValid) {
            const datas = {
                'email': email,
                'password': password,
            }
            try {
                setisloading(true)
                const { data } = await apiCall('post', EndPoints.SIGNIN, datas)
                if (data.status === 200) {
                    signIn(data.token);
                    await localStorage.setItem('AuthData', JSON.stringify(data));
                    isRemember && setCookie(
                        'email',
                        email,
                        30
                    )
                    isRemember && setCookie(
                        'password',
                        password,
                        30
                    )
                    setisloading(false)
                    history.push('/dashboard');
                } else if (data.status === 201) {
                    setErrorMessage(data.message)
                    setToperror(true)
                } else {
                    history.push('/');
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    function onClickRemember(params) {
        setRememberMe(!isRemember)
        setIsRemember(!isRemember)
    }

    return (
        <>
            {isloading && <Loader />}
            <Loginscreen
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                simpleValidator={simpleValidator}
                usersignin={() => usersignin()}
                errorMessage={errorMessage}
                toperror={toperror}
                onClickRemember={onClickRemember}
                isRemember={isRemember}
            />
        </>

    )
}

export default Loginview;