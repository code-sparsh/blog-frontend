import { Link } from "react-router-dom";

const BlogComponent = ({ blog: blog }) => {

    console.log("good")
    console.log(blog);

    let shortData = "";

    if (blog.data) {
        shortData = blog.data.slice(0, 300);
        shortData = shortData + "   ...";
    }

    return (
        <div className=" bg-gray-100 p-10 border shadow-sm">
            <div className=" grid">
                <div className="flex justify-between">
                    <Link to={"/blog/" + blog.id} className="title text-2xl font-bold hover:underline">{blog.title}</Link>
                    <div className="author text-right font-semibold hover:underline">By - {blog.author}</div>
                </div>

                <div className="data">{shortData}</div>
            </div>
        </div>
    )
}

export default BlogComponent;