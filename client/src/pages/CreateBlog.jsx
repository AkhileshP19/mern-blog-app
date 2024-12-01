import { useState } from "react"
import {Box, InputLabel, TextField, Typography, Button} from '@mui/material'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';

const CreateBlog = () => {
    const navigate = useNavigate();
    const id = localStorage.getItem('userId');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: ''
    })

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
            const res = await axios.post(
                'https://8080-akhileshp19-mernblogapp-a77ynvvh88j.ws-us117.gitpod.io/api/v1/blog/create-blog',
                {
                    title: formData.title,
                    description: formData.description,
                    image: formData.image,
                    user: id
                }
            )
            if (res.data.success) {
                toast.success('Blog created successfully');
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
                        Create Blog
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
                        Create Blog
                    </Button>
                </Box>
            </form>
        </>
    )
}

export default CreateBlog;