// web
import React from "react";
//import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginScreen from './Screens/Auth/Login';
import ActanableScreen from './Screens/Actionable';
import NotifyScreen from './Screens/Notify';
import ScoreScreen from './Screens/Score';
import WelcomeAuditScreen from './Screens/WelcomeAudit';
import QuestionScreen from './Screens/Question';
import DashboardScreen from './Screens/Dashboard';
import Actionablequestion from './Screens/Actionablequestion';
import UpdateAudit from './Screens/Updateaudit';
import EndPoints from './Screens/utils/apiEndPoints'
import { apiCall, setDefaultHeader } from './Screens/utils/httpClient';
import { AuthContext } from './component/Context/context';
import { QuestionProvider } from "./Context/QuestionContext";

function Routes() {
  const initialLoginState = {
    isLoading: true,
    userToken: null,
  };
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
        };
    }
  };
  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
  const authContext = React.useMemo(() => ({
    signIn: async (Token) => {
      const userToken = Token;
      console.log('userToken: ', userToken);
      try {
        await localStorage.setItem('AuthToken', userToken);
        console.log('userToken: ', userToken);
        await setDefaultHeader('token', userToken)
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGIN', token: userToken });
    },
    signOut: async (user_id) => {
      try {
        await localStorage.removeItem('AuthToken');
        window.location.reload();
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
    },
    setRememberMe: async (status) => {
      try {
        await localStorage.setItem('remeberMe', status);
        const isRemember = localStorage.getItem('remeberMe');
        console.log('status: ', (isRemember));
      } catch (e) {
        console.log(e);
      }
    },
    rememberData: () => {
      try {
        const isRemember = localStorage.getItem('remeberMe');
        console.log('isRemember: remeberdata ', isRemember);
        function getBool(val) {
          return !!JSON.parse(String(val).toLowerCase());
        }
        return { isRemember: getBool(isRemember) }
      } catch (e) {
        console.log(e);
      }
    }
  }), []);
  React.useEffect(() => {
    getToken()
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await localStorage.getItem('AuthToken');
        console.log('userToken: ', userToken);
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);

  }, []);
  async function getToken() {
    try {
      const Auth = await localStorage.getItem('AuthToken');
      if (Auth !== null && Auth !== 'undefined') {
        await setDefaultHeader('token', Auth)
      } else {
        const { data } = await apiCall('get', EndPoints.JWTTOKEN)
        await setDefaultHeader('token', data.token)
        await localStorage.setItem('token', data.token);
      }
    } catch (error) {
      console.log(error)
    }
  }
  if (loginState.isLoading) {
    return (
      <center>
        <div className="mfp-content loaderimage overhiden">
          <img className="profile_size" src='img/loader.gif' alt="" />
        </div>
      </center>)
  }
  return (
    <AuthContext.Provider value={authContext}>
      <Router>
        <Switch>
          <Route path="/actionable/:id" component={ActanableScreen} />
          <Route path="/score">
            <ScoreScreen />
          </Route>
          <Route path="/dashboard">
            <DashboardScreen />
          </Route>
          <Route path="/notify/:audit_id">
            <NotifyScreen />
          </Route>
          <Route path="/actionquestion">
            <Actionablequestion />
          </Route>
          <Route path="/welcomeaudit/:audit_id">
            <WelcomeAuditScreen />
          </Route>
          <Route path="/updateaudit">
            <UpdateAudit />
          </Route>
          <Route path="/question">
            <QuestionScreen />
          </Route>
          <Route path="/">
            <LoginScreen />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}
export default Routes;