import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Box, InputLabel, TextField, Typography, Button} from '@mui/material'
import toast from 'react-hot-toast';

const BlogDetails = () => {
    const [blog, setBlog] = useState({});
    const id = useParams().id;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});

    const getBlogDetails = async() => {
        try {
            const res = await axios.get(
                `https://8080-akhileshp19-mernblogapp-a77ynvvh88j.ws-us117.gitpod.io/api/v1/blog/get-blog/${id}`
            )
            if (res.data.success) {
                setBlog(res.data.data);
                setFormData({
                    title: res?.data.data.title,
                    description: res?.data.data.description,
                    image: res?.data.data.image
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBlogDetails();
    }, [id]);

    const handleChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
            
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(formData);
        try {
            const res = await axios.put(
                `https://8080-akhileshp19-mernblogapp-a77ynvvh88j.ws-us117.gitpod.io/api/v1/blog/update-blog/${id}`,
                {
                    title: formData.title,
                    description: formData.description,
                    image: formData.image,
                    user: id
                }
            )
            if (res.data.success) {
                toast.success('Blog updated successfully');
                navigate('/my-blogs');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box width={'60%'} border={3} borderRadius={10} padding={3} margin='auto' boxShadow={'10px 10px 20px #ccc'} display='flex' flexDirection={'column'} marginTop='30px'>
                    <Typography variant="h2" textAlign={'center'} fontWeight='bold' padding={3} color="gray" >
                        Update Blog
                    </Typography>

                    <InputLabel sx={{mb: 1, mt: 2, fontSize: '24px'}} fontWeight='bold'>
                        Title
                    </InputLabel>
                    <TextField 
                        name="title" 
                        margin="normal" 
                        variant="outlined" 
                        value={formData.title} 
                        onChange={handleChange}
                        required
                    />

                    <InputLabel sx={{mb: 1, mt: 2, fontSize: '24px'}} fontWeight='bold'>
                        Description
                    </InputLabel>
                    <TextField 
                        name="description" 
                        margin="normal" 
                        variant="outlined" 
                        value={formData.description} 
                        onChange={handleChange}
                        required
                    />

                    <InputLabel sx={{mb: 1, mt: 2, fontSize: '24px'}} fontWeight='bold'>
                        Image URL
                    </InputLabel>
                    <TextField 
                        name="image" 
                        margin="normal" 
                        variant="outlined" 
                        value={formData.image} 
                        onChange={handleChange}
                        required
                    />
                    
                    <Button type="submit" color="primary" variant="contained" sx={{borderRadius: 1, marginTop: 2}}>
                        Update Blog
                    </Button>
                </Box>
            </form>
        </>
    )
}

export default BlogDetails;