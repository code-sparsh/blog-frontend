import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import useSessionExpired from '../hooks/useSessionExpired.js';
import { ThreeDots } from 'react-loader-spinner'


const BlogPost = () => {

    const params = useParams();
    const id = params.id;
    const { sessionExpired } = useSessionExpired();

    // const token = JSON.parse(localStorage.getItem("user")).token

    const [blog, setBlog] = useState(null);

    useEffect(() => {

        const fetchBlog = async () => {

            const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/public/blog/" + id, {
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
            setBlog(data);
            console.log(blog)
        }

        fetchBlog();
    }, [])

    return (
        <div className=' min-h-screen'>
            {blog ?
            <div className="md:bg-gray-100 h-full flex justify-center break-words whitespace-pre-line">
                <div className="lg:w-2/4 bg-gray-100 md:bg-white border shadow-md h-full w-full">
                    <img src ={blog.imageURL}/>
                    <div className="font-bold text-3xl md:text-5xl p-8">{blog.title}</div>
                    <div className="p-6 md:p-12 text-lg">{blog.data}</div>
                </div>  
            </div>
            :
            <div className='grid place-items-center mt-16'><ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                /> </div>
            }
        </div>

        
        
    )

}

export default BlogPost;