import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";


const BlogPost = () => {

    const params = useParams();
    const id = params.id;

    const [blog, setBlog] = useState([]);

    useEffect(() => {

        const fetchBlog = async () => {

            const response = await fetch("https://blogpoint-backend.up.railway.app/api/blog/" + id, {
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
        <div className="bg-graye-100 h-screen flex justify-center">
            <div className="h-full w-2/4 bg-graye-100 border shadow-md">
                <div className="font-bold text-5xl p-8">{blog.title}</div>
                <div className="p-12 text-lg">{blog.data}</div>
            </div>
            
        </div>
    )

}

export default BlogPost;