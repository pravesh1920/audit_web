import React from 'react';
import { useHistory } from "react-router-dom";
const LoginSCreen = (props) => {
    const history = useHistory();
    return (
        <> <section className="login-area ">
            <div className="container ">
                <div className="login-content main_page">
                    <div className="login-body pt-3 pb-3">
                        <div className="login-head-logo text-center">
                            <img src="assets/images/logo.png" className="logo-img" />
                        </div>
                        <div className="login-main text-center">
                            <img src="assets/images/login-image.png" className="image" />
                        </div>
                        <div className="form-body">
                            <div className="login-titile text-center">
                                <h2 className="title">Login</h2>
                            </div>
                            {(props.toperror) ? <div className="sign__group toperrormessage">{props.errorMessage}</div> : ''}
                            <form>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-sm auth--form"
                                        placeholder="Email Address / Employee ID"
                                        value={props.email}
                                        onChange={(event) => props.setEmail(event.target.value)} />

                                    <div className="errorTxt">
                                        {props.simpleValidator.current.message('Email', props.email, 'required')}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control form-control-sm auth--form"
                                        value={props.password}
                                        placeholder="Password"
                                        onChange={(event) => props.setPassword(event.target.value)}
                                    />
                                    <div className="errorTxt">
                                        {props.simpleValidator.current.message('Password', props.password, 'required')}
                                    </div>
                                </div>
                                <div className="form-group d-flex justify-content-between pl-2 pr-2">
                                    <span className="auth-forgot">
                                        <input
                                            type="checkbox"
                                            id="vehicle2"
                                            name="vehicle2"
                                            defaultValue="Car"
                                            onChange={()=>props.onClickRemember()}
                                            checked={props.isRemember?true:false}
                                        />{" "}
                                        Keep Me Signed In
                                        </span>
                                    <a
                                        href="#forgotPassword"
                                        data-toggle="tab"
                                        className=" auth-forgot"
                                    >
                                        Forgot password
                                 </a>
                                </div>
                                <div className="mb-4 mt-4">
                                    <button type="button" className="btn btn-primary main--btn" onClick={() => props.usersignin()}>Log In</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>

    )


}

export default LoginSCreen;