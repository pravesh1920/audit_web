import React, { useState } from "react";
export const UserContext = React.createContext();
export const DataContext = React.createContext();
export const WatchNowContext = React.createContext();

export const UserProvider = (props) => {
  const [userData, setUserData] = useState([])
  return (
    <UserContext.Provider value={[userData, setUserData]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const CartDataProvider = (props) => {
  const [cartData, setCartData] = useState([])
  return (
    <DataContext.Provider value={[cartData, setCartData]}>
      {props.children}
    </DataContext.Provider>
  )
}
// const [value, setValue] = React.useState("foo");
// const [value2, setValue2] = React.useState("goo");
{/* <MyContext.Provider
  value={{ value: [value, setValue], value2: [value2, setValue2] }}
>
  {props.children}
</MyContext.Provider>; */}

// const { value, value2 } = React.useContext(MyContext);
// const [stateValue, setStateValue] = value;
// const [stateValue2, setStateValue2] = value2;

export const WatchnowProvider = (props) => {
  const [watchnow, setWatchnow] = useState([])
  return (
    <WatchNowContext.Provider value={[watchnow, setWatchnow]}>
      {props.children}
    </WatchNowContext.Provider>
  )
}
