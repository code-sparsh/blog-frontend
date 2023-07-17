import React, { useState } from 'react';
import useAuthContext from '../hooks/useAuthContext';

const BlogForm = () => {

    const {user} = useAuthContext();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState(user.name);


    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit =  async (e) => {
        e.preventDefault();
        console.log('Title:', title);
        console.log('Content:', content);

        const response = await fetch("http://localhost:8080/api/blog/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title, data: content, author})
        })

        const data = await response.json();

        if(response.ok) {
            console.log(data);
        }
        if(!response.ok) {
            console.log(data);
        }
        // Clear the form fields after submitting
        setTitle('');
        setContent('');
    };

    return (
        <div className="bg-yellow-100 min-h-screen flex justify-center">
            <div className="bg-yellow-50 shadow-lg rounded-lg p-8 w-3/4 mt-20 h-3/4">
                <div className="flex justify-between">
                    <h1 className="text-3xl mb-4">Create a New Blog Post</h1>
                    <button onClick={handleSubmit}
                        className="bg-yellow-700 hover:bg-yellow-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
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

                </form>
            </div>
        </div>
    );
};

export default BlogForm;
