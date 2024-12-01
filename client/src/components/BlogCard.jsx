import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Icon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const BlogCard = ({title, description, image, username, time, id, isUser}) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  }

  const handleDelete = async() => {
    try {
      const res = await axios.delete(
        `https://8080-akhileshp19-mernblogapp-a77ynvvh88j.ws-us117.gitpod.io/api/v1/blog/delete-blog/${id}`
      )
      if (res.data.success) {
        toast.success(res.data.message);
        // navigate('/my-blogs');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card sx={{ maxWidth: '40%', margin: 'auto', marginTop: 2, padding: 2, boxShadow: '5px 5px 10px #ccc', '&:hover': {
      boxShadow: '10px 10px 20px #ccc',
    }, cursor: 'pointer' }}>
      {
        isUser && (
          <Box display={'flex'}>
            <IconButton onClick={handleEdit} sx={{marginLeft: 'auto'}}>
              <ModeEditIcon color='info' />
            </IconButton> 
            <IconButton onClick={handleDelete}>
              <DeleteIcon color='error'/>
            </IconButton>
          </Box>
        )
      }
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
        title={username}
        subheader={time}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="blog img"
      />
      <CardContent>
        <Typography variant='h6' color='text.secondary'>
          Title: {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Description: {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BlogCard;