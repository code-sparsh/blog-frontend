import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BlogComponent from '../components/BlogComponent';
import useSessionExpired from '../hooks/useSessionExpired.js';


import { ThreeDots } from 'react-loader-spinner'


const Home = () => {

    const [blogs, setBlogs] = useState(null);
    const { sessionExpired } = useSessionExpired();


    // const token = JSON.parse(localStorage.getItem("user")).token
    const storedUser = JSON.parse(localStorage.getItem("user"));
    let username = "";

    if(storedUser)
        username = JSON.parse(localStorage.getItem("user")).username

    useEffect(() => {

        const fetchBlogs = async () => {

            const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/public/blog", {
                method: "GET",
                // headers: {
                //     "Authorization": "Bearer " + token
                // }
            })

            const data = await response.json();

            if (!response.ok) {
                console.log(data.error);
                if (response.status == 401) {
                    sessionExpired();
                }
                return;
            }
            setBlogs(data);
        }
        fetchBlogs();
    }, [])


    return (
        <div className="bg-yellowe-100 h-screen">

            <div className=' text-lg  lg:text-4xl  text-center font-sans py-4 bg-gray-100 '>{username ?  (<>Welcome, <span className="font-bold">{username}</span></>) : (<div className=' text-2xl italic'>Please login or create a new account</div>) }</div>

            <div className="px-12 pt-12 text-4xl text-center">Blogs</div>

            {username?<div className="flex justify-end">
                <Link to="/create-blog" className="text-xl md:text-2xl w-min my-2 mx-4 md:mx-16 bg-green-400 hover:bg-green-500 border p-4 rounded-lg">+POST</Link>
            </div>:null}
            <div className="m-2 md:m-12">
                {
                    blogs && blogs.map((blog) => {
                        return <BlogComponent key={blog.id} blog={blog} />
                    })

                }
                {!blogs ? <div className='grid place-items-center mt-10'><ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                /> </div>: null}

            </div>
        </div>
    )
}

export default Home