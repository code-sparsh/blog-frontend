import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { ThreeDots } from 'react-loader-spinner'
import { MdDelete } from "react-icons/md";

const UserProfile = () => {

    const params = useParams();
    const id = params.id;

    const [userData, setUserData] = useState(null);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    let username = "";
    let token = "";

    if(storedUser) {
        username = storedUser.username;
        token = storedUser.token;
    }






    useEffect(() => {
        const fetchUserProfile = async () => {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/public/user/" + id);
            const data = await response.json();

            if (!response.ok) {
                console.log(data.error);
                return;
            }

            setUserData(data);
        }

        fetchUserProfile();
    }, []);

    

    const handleBlogDelete = async (id) => {

        const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/blog/" + id,  {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        const data = await response.json();

        if(!response.ok) {
            console.log(data);
            return;
        }

        const newBlogs = userData.blogs.filter((blog) => blog.id !== id);
        setUserData({...userData, blogs: newBlogs})
    }

    return (

        <div className="h-fit w-full flex justify-center p-4">
            {userData ? (
                <div className="border border-double bg-slate-100 shadow-lg h-full flex flex-col gap-10 w-full md:w-3/4 p-4">
                    <div className="flex justify-center items-center gap-4">
                        <img src={"/dummy-profile-photo.jpg"} placeholder="user_profile" className="w-36 h-40 bg-slate-400"></img>
                        <div>
                            <div className="text-3xl">{userData.username}</div>
                            <div className="text-lg">{userData.name}</div>
                        </div>
                    </div>

                    <div className="  bg-green-100 rounded-lg flex flex-col gap-6 p-4">
                        <div className="text-5xl text-center">Blogs</div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {userData.blogs.map((blog) => {

                                return (
                                    <div key={blog.id} className="bg-neutrals-100 p-6 border shadow-sm flex flex-col lg:flex-row">
                                        <div className="h-64 lg:h-44 lg:w-3/6 w-full">
                                            <img src={blog.imageURL} alt="blog image" className="h-full w-full object-cover" />
                                        </div>
                                        <div className="mt-4 lg:mt-0 lg:ml-4 flex flex-col justify-between">
                                            <Link to={"/blog/" + blog.id} className="title text-lg font-bold hover:underline">
                                                {blog.title}
                                            </Link>
                                            <div onClick={handleBlogDelete} className=" text-end cursor-pointer"><MdDelete/></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid place-items-center mt-10">
                    <ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            )}
        </div>


    );
}

export default UserProfile;