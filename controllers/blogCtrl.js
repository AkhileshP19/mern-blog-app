const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

// Get all blogs
const getAllBlogsController = async(req, res) => {
    try {
        const blogs = await blogModel.find({}).populate('user');
        if (!blogs) {
            return res.status(200).send({
                success: false,
                message: 'No blogs found'
            })
        }
        return res.status(200).send({
            blogCount: blogs.length,
            success: true,
            message: 'All blogs list',
            data: blogs
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: true,
            message: 'Error while fetching blogs',
            error
        })
    }
}

// Create blog
const createBlogController = async(req, res) => {
    try {
        const {title, description, image, user} = req.body;
        // validation
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields'
            })
        }
        const existingUser = await userModel.findById(user);
        // validation
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: 'Unable to find user'
            })
        }
        const newBlog = new blogModel({title, description, image, user});
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({session});
        existingUser.blogs.push(newBlog);
        await existingUser.save({session});
        await session.commitTransaction();
        await newBlog.save();
        return res.status(200).send({
            success: true,
            message: 'Blog created successfully',
            data: newBlog
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while creating blog',
            error
        })
    }
}

// Update blog
const updateBlogController = async(req, res) => {
    try {
        const {id} = req.params;
        const {title, description, image} = req.body;
        const blog = await blogModel.findByIdAndUpdate(id, {...req.body}, {new: true});
        return res.status(200).send({
            success: true,
            message: 'Blog updated successfully',
            data: blog
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while updating blog',
            error
        })
    }
}

// Get single blog
const getSingleBlogController = async(req, res) => {
    try {
        const {id} = req.params;
        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: 'Blog not found with this id'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Blog fetched successfully',
            data: blog
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while fetching single blog',
            error
        })
    }
}

// Delete blog
const deleteBlogController = async(req, res) => {
    try {
        const blog = await blogModel.findByIdAndDelete(req.params.id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            success: true,
            message: 'Blog deleted successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while deleting blog',
            error
        })
    }
}

// Get user blog
const userBlogController = async(req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate('blogs');
        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: 'Blog not found with this id'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'User blog fetched',
            data: userBlog
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error in user blog',
            error
        })
    }
}

module.exports = {
    getAllBlogsController,
    createBlogController,
    updateBlogController,
    getSingleBlogController,
    deleteBlogController,
    userBlogController
}

