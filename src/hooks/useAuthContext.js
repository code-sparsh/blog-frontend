import {AuthContext} from '../context/AuthContext'
import {useContext} from 'react'

const useAuthContext = () => {

    const context = useContext(AuthContext);

    if(!context) {
        throw Error("Call the context hook inside the AuthContextProivder only")
    }

    

    return context;
}

export default useAuthContext