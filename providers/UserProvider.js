import { StyleSheet, Text, View } from 'react-native'
import React, {createContext, useEffect} from 'react'
import useFetch from '../hooks/useFetch'

const mockapi = process.env.EXPO_PUBLIC_MOCKAPI_URL

export const UserContext = createContext({
    users: [],
    getFetch: (link, options, id) => {}
})

export const UserProvider = ({children}) => {

    const [users, getFetch] = useFetch()
    useEffect(() => {
        getFetch(mockapi, {})
    },[])


  return (
    <UserContext.Provider value={{ users, getFetch}}>
        {children}
    </UserContext.Provider>

  )
}


