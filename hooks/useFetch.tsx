import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { addUser, addUsers, deleteUser, updateUser} from '@/redux/useReducer'

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

        if(options.method === 'DELETE') {
        //     setState(state => {
        //         if(!state) return []
        //         return state.filter(item => item.id !== id)
        //     })
        // } else if (options.method === 'PUT') {
        //     setState(state => {
        //         if(!state) return [data] as Array<UserType>
        //         return state.map(item => {
        //             if((item as UserType).id === id) {
        //             const userObj: UserType = data as UserType
        //             return userObj
        //             }
        //             return item
        //         })

        //     })
        dispatch(deleteUser(id))
        } else if (options.method === 'POST') {
        //     setState(state => {
        //         return [...state, data as UserType]
                
        // })
        dispatch(addUser(data))
    } else {
        const arrayResponse: Array<UserType> = data as Array<UserType>
        dispatch(addUsers(arrayResponse))
    }
    }  catch (error) {
        // Log the error for debugging
        console.error('Fetch error:', error);
    }
    }
    return[state, getFetch] as const
}

export default useFetch