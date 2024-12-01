import {Box, Typography, TextField, Button} from '@mui/material'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import {authActions} from '../redux/store'
import toast from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // state
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    // handle input change
    const handleChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                'https://8080-akhileshp19-mernblogapp-a77ynvvh88j.ws-us117.gitpod.io/api/v1/user/login', 
                {email: formData.email, password: formData.password}
            );
            if (res.data.success) {
                localStorage.setItem('userId', res?.data?.data._id);
                dispatch(authActions.login());
                toast.success(res.data.message);
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box maxWidth={450} display='flex' flexDirection={'column'} alignItems={'center'} justifyContent={'center'} margin={'auto'} marginTop={5} boxShadow='10px 10px 20px #ccc' padding={3} borderRadius={5}>
                    <Typography variant='h4' padding={3} textAlign='center' textTransform='uppercase'>Login</Typography>
                    <TextField 
                        placeholder='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        margin='normal'
                        type={'email'}
                        required
                    />
                    <TextField 
                        placeholder='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        margin='normal'
                        type={'password'}
                        required
                    />
                    <Button
                        sx={{borderRadius: 1, marginTop: 3}}
                        type='submit'
                        variant='contained'
                        color='primary'
                    >
                        Login
                    </Button>
                    <Button onClick={() => navigate('/register')} sx={{borderRadius: 1, marginTop: 3}}>
                        Not a user ? Please Register
                    </Button>
                </Box>
            </form>
        </>
    )
}

export default Login;