import { Link } from 'react-router-dom';
import userImage from '../images/dummyImage.svg'
import useAuthContext from '../hooks/useAuthContext';
import useLogout from '../hooks/useLogout';
import blogIcon from '../images/Blog-icon.png'
import { useState } from "react";

const Navbar = () => {
    const {user} = useAuthContext()
    const {logout} = useLogout();


    const [isDropdownOpened, setIsDropdownOpened] = useState(false);
    const [isUserMenuOpened, setIsUserMenuOpened] = useState(false);
    

    const toggleDropdownMenu = () => {
        setIsDropdownOpened(!isDropdownOpened)
    }
    const toggleUserMenu = () => {
        setIsUserMenuOpened(!isUserMenuOpened)
    }


    const onClickHandle = () => {
        logout()
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    let username = "";

    if(storedUser)
        username = JSON.parse(localStorage.getItem("user")).username


    let name,email;

    if(user) {
        name =  user.name
        email = user.email
    }

    if(!user) {
        name = "abc"
        email = "not@logged.in"
    }



    return (

        <nav className=" bg-slate-300 border-gray-200 shadow px-2 sm:px-4 py-2.5 rounded light:bg-gray-900">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <Link to="/" className="flex items-center">

                    <img src={blogIcon} className=" h-11 mr-3"/>
                    <span className="self-center text-2xl m-2 font-semibold whitespace-nowrap light:text-white">BlogPoint</span>
                </Link>
                <div className="flex items-center md:order-2">
                    <button type="button" onClick = {toggleUserMenu} className="flex mr-3 text-sm rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 light:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        <span className="sr-only">Open user menu</span>
                        <img className="w-8 h-8 rounded-full" src={userImage} alt="user photo"/>
                    </button>
                    <div className={` ${isUserMenuOpened ? ' absolute top-10 right-5' : 'hidden'} "hidden x-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow light:bg-gray-700 light:divide-gray-600`} id="user-dropdown">
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900 light:text-white">{name}</span>
                            <span className="block text-sm font-medium text-gray-500 truncate light:text-gray-400">{email}</span>
                        </div>
                        <ul className="py-2" aria-labelledby="user-menu-button">
                            <li>
                                <Link to={"/u/" + username} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 light:hover:bg-gray-600 light:text-gray-200 light:hover:text-white">My Profile</Link>
                            </li>
                            <li>
                                <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 light:hover:bg-gray-600 light:text-gray-200 light:hover:text-white">Settings</Link>
                            </li>
                            {user && <li>
                                <button onClick={onClickHandle} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 light:hover:bg-gray-600 light:text-gray-200 light:hover:text-white">Sign out</button>
                            </li>}
                        </ul>
                    </div>
                    <button onClick = {toggleDropdownMenu} data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 light:text-gray-400 light:hover:bg-gray-700 light:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
                <div className={` ${isDropdownOpened ? '' : 'hidden'} items-center justify-between w-full md:flex md:w-auto md:order-1" id="mobile-menu-2`}>
                    <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white light:bg-gray-800 md:light:bg-gray-900 light:border-gray-700">
                        <li>
                            <Link to="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 light:text-white" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link to="/" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 light:text-gray-400 md:light:hover:text-white light:hover:bg-gray-700 light:hover:text-white md:light:hover:bg-transparent light:border-gray-700">About</Link>
                        </li>
                        
                        {!user? <li>
                            <Link to="/login" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 light:text-gray-400 md:light:hover:text-white light:hover:bg-gray-700 light:hover:text-white md:light:hover:bg-transparent light:border-gray-700">Login</Link>
                        </li> : null}
                        {!user? <li>
                            <Link to="/signup" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 light:text-gray-400 md:light:hover:text-white light:hover:bg-gray-700 light:hover:text-white md:light:hover:bg-transparent light:border-gray-700">Signup</Link>
                        </li>: null}
                        {user? <li>
                            <Link to="/" onClick = {logout}className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 light:text-gray-400 md:light:hover:text-white light:hover:bg-gray-700 light:hover:text-white md:light:hover:bg-transparent light:border-gray-700">Logout</Link>
                        </li>: null}
                    </ul>
                </div>
            </div>
        </nav>

    );
}

export default Navbar;