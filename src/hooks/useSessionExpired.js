import useAuthContext from "./useAuthContext"
import { Navigate } from "react-router-dom"

const useSessionExpired = () => {

    const {dispatch} = useAuthContext()
    const sessionExpired = () => {

        localStorage.removeItem('user')
        dispatch({type:'LOGOUT'})

        return <Navigate to="/login"/> 
    }

    return {sessionExpired}
}

export default useSessionExpired