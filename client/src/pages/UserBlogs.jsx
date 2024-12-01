import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";

const UserBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    // get user blog
    const getUserBlogs = async() => {
        try {
            const id = localStorage.getItem('userId');
            const res = await axios.get(
                `https://8080-akhileshp19-mernblogapp-a77ynvvh88j.ws-us117.gitpod.io/api/v1/blog/user-blog/${id}`
            )
            if (res?.data.success) {
                setBlogs(res.data.data.blogs);
                console.log(res.data.data.blogs);    
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserBlogs();
    }, [])

    return (
        <>
            {blogs && blogs.length > 0 ? (
                blogs?.map(blog => (
                    <BlogCard 
                        id={blog._id}
                        isUser={true}
                        title={blog.title}
                        description={blog.description}
                        image={blog.image}
                        username={blog.user.username}
                        time={blog.createdAt}
                    />
                ))
            ) : (<h3>No blogs created yet</h3>)}
        </>
    )
}

export default UserBlogs;