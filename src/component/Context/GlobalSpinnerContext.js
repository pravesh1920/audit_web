import React, { useState, createContext,useMemo } from 'react'

export const GlobalSpinnerContext = createContext()

const GlobalSpinnerContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const value = useMemo(() => ({
    isLoading,
    setIsLoading
  }), [isLoading])
  return (
    <GlobalSpinnerContext.Provider value={value}>
        {props.children}
    </GlobalSpinnerContext.Provider>
  )
}

export default GlobalSpinnerContextProvider