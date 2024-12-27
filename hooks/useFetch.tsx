import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { addUser, addUsers, deleteUser, updateUser} from '@/redux/useReducer'
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserType = {
    name: string,
    id: string,
    avatar: string,
    createdAt: string    
}

type UserResponse = Array<UserType> | UserType

const useFetch = () => {
    const [state, setState] = useState<Array<UserType>>([]);
    const dispatch = useDispatch()
    const getFetch = async(link: string, options: RequestInit, id?: string) => {
       try {
        const result = await fetch(link, options)
        const data: UserResponse = await result.json()

        await AsyncStorage.setItem('shoppingList', JSON.stringify(data));

        if(options.method === 'DELETE') {

        dispatch(deleteUser(id))
        } else if (options.method === 'POST') {
                
        dispatch(addUser(data))
    } else {
        const arrayResponse: Array<UserType> = data as Array<UserType>
        dispatch(addUsers(arrayResponse))
    }
    }  catch (error) {
        console.error('Fetch error:', error);
    }
    }
    return[state, getFetch] as const
}

export default useFetch