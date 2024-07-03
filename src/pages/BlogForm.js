import React, { useState } from 'react';
import useAuthContext from '../hooks/useAuthContext';
import useSessionExpired from '../hooks/useSessionExpired.js';
const BlogForm = () => {

    const {user} = useAuthContext();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const { sessionExpired } = useSessionExpired();
    const token = JSON.parse(localStorage.getItem("user")).token



    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handleSubmit =  async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        // formData.append('blog', JSON.stringify({title, content}));
        formData.append('image', image);
        formData.append('title', title);
        formData.append('data', content);
        formData.append('hello', 'world');

        const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/blog/create", {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": "Bearer " + token,          
            },
        })

        const data = await response.json();

        if(response.ok) {
            console.log(data);
        }
        if(!response.ok) {
            console.log(data);
            if (response.status == 401) {
                sessionExpired();
            }
        }
        // Clear the form fields after submitting
        setTitle('');
        setContent('');
        setImage('')
    };

    return (
        <div className="bg-yellow-100 min-h-screen flex justify-center">
            <div className="bg-yellow-50 shadow-lg rounded-lg p-8 w-4/5 md:w-3/4 mt-20 h-3/4">
                <div className="flex justify-between">
                    <h1 className="text-3xl mb-4">Create a New Blog Post</h1>
                    <button onClick={handleSubmit} 
                    className="bg-yellow-700 hover:bg-yellow-900 text-white font-bold py-2 px-4 rounded">
                        Post
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            type="text"
                            placeholder="Enter the title"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                            Content
                        </label>
                        <textarea
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-72 resize-none"
                            id="content"
                            placeholder="Enter the content"
                            value={content}
                            onChange={handleContentChange}
                        />
                    </div>

                    <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                            Cover Image
                    </label>
                        <input type="file" name="image" onChange={handleFileChange}/>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default BlogForm;
