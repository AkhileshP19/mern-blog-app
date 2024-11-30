const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

const registerController = async(req, res) => {
    try {
        const {username, email, password} = req.body;
        // validation:
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please fill all the fields'
            })
        }
        // existing user:
        const existingUser = await userModel.findOne({email});
        if (existingUser) {
            return res.status(401).send({
                success: false,
                message: 'User already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // save new user:
        const user = await new userModel({username, email, password: hashedPassword});
        await user.save();
        return res.status(201).send({
            success: true,
            message: 'User created successfully',
            data: user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error in register callback',
            success: false,
            error
        })  
    }
}

const getAllUsersController = async(req, res) => {
    try {
        const users = await userModel.find({});
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message: 'Users fetched successfully',
            data: users
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in fetching all users',
            error
        })
        
    }
}

const loginController = async(req, res) => {
    try {
        const {email, password} = req.body;
        // validation:
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: 'Please provide a email or a password'
            })
        }
        const user = await userModel.findOne({email});
        // check the user
        if (!user) {
            return res.status(200).send({
                success: false,
                message: 'Email is not registered'
            })
        }
        // check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid email or password'
            })
        }
        return res.status(200).send({
            message: true,
            message: 'Login successful',
            data: user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in login callback',
            error
        })
    }
}

module.exports = {
    getAllUsersController,
    registerController,
    loginController,
}