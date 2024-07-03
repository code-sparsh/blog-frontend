import { Link } from "react-router-dom";

const BlogComponent = ({ blog: blog }) => {

    let shortData = "";

    if (blog.data) {
        shortData = blog.data.slice(0, 300);
        shortData = shortData + "   ...";
    }

    return (
        <div className="bg-gray-100 p-10 border shadow-sm flex flex-col lg:flex-row">
            <div className=" h-64 lg:h-44 lg:w-3/6 w-full">
                <img src={blog.imageURL} alt="blog image" className="h-full w-full object-cover" />
            </div>
            <div className="grid mt-4 lg:mt-0 lg:ml-4">
                <div className="flex justify-between">
                    <Link to={"/blog/" + blog.id} className="title text-2xl font-bold hover:underline">{blog.title}</Link>
                    <div className="author text-right font-semibold hover:underline">By - {blog.author}</div>
                </div>
                <div className="mt-4 break-words">{shortData}</div>
            </div>
        </div>


    )
}

export default BlogComponent;