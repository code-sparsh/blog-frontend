import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BlogComponent from '../components/BlogComponent';


const Home = () => {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {

        const fetchBlogs = async () => {

            const response = await fetch("http://localhost:8080/api/blog", {
                method: "GET",
            })

            const data = await response.json();

            if (!response.ok) {
                console.log(data.error);
                return;
            }
            setBlogs(data);
            console.log(data)
        }

        fetchBlogs();
    }, [])


    return (
        <div className="bg-yellowe-100 h-screen">

            <div className="px-12 pt-12 text-4xl text-center">Blogs</div>

            <div className="flex justify-end">
                <Link to="/blog/new" className="text-2xl w-min mx-16 bg-green-400 hover:bg-green-500 border p-4 rounded-lg">+POST</Link>
            </div>
            <div className="m-12">
                {
                    blogs && blogs.map((blog) => {
                        console.log("hey")
                        console.log(blog);
                        return <BlogComponent key={blog.id} blog={blog} />
                    })

                }
                {/* {blogs?
            <BlogComponent blog = {blogs[0]} />: null
            } */}
            </div>
        </div>
    )
}

export default Home