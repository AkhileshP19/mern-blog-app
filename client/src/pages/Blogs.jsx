import { asyncThunkCreator } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    // get blogs
    const getAllBlogs = async() => {
        try {
            const res = await axios.get(
                'https://8080-akhileshp19-mernblogapp-a77ynvvh88j.ws-us117.gitpod.io/api/v1/blog/all-blog'
            )
            if (res.data.success) {
                setBlogs(res.data.data);
                console.log(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllBlogs()
    }, [])

    return (
        <div>
            {blogs &&
            blogs.map((blog) => (
                <BlogCard
                key={blog?._id}
                id={blog?._id}
                isUser={localStorage.getItem("userId") === blog?.user?._id}
                title={blog?.title}
                description={blog?.description}
                image={blog?.image}
                username={blog?.user?.username}
                time={blog?.createdAt}
                />
            ))}
        </div>
    )
}

export default Blogs;