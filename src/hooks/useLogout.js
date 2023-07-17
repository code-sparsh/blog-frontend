import useAuthContext from "./useAuthContext"
import { Navigate } from "react-router-dom"

const useLogout = () => {

    const {dispatch} = useAuthContext()
    const logout = () => {

        localStorage.removeItem('user')
        dispatch({type:'LOGOUT'})

        return <Navigate to="/login"/>
        
    }

    return {logout}
}

export default useLogout