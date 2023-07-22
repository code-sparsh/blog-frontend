import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";


const BlogPost = () => {

    const params = useParams();
    const id = params.id;

    const [blog, setBlog] = useState([]);

    useEffect(() => {

        const fetchBlog = async () => {

            const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/blog/" + id, {
                method: "GET",
            })

            const data = await response.json();

            if (!response.ok) {
                console.log(data.error);
                return;
            }
            setBlog(data);
            console.log(blog)
        }

        fetchBlog();
    }, [])

    return (
        <div className="md:bg-gray-100 h-full flex justify-center break-words whitespace-pre-line">
            <div className="lg:w-2/4 bg-gray-100 md:bg-white border shadow-md h-full">
                <div className="font-bold text-3xl md:text-5xl p-8">{blog.title}</div>
                <div className="p-6 md:p-12 text-lg overflow-wrap">{blog.data}</div>
            </div>  
        </div>
    )

}

export default BlogPost;