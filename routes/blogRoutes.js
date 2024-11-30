const express = require('express');
const { getAllBlogsController, createBlogController, updateBlogController, getSingleBlogController, deleteBlogController, userBlogController } = require('../controllers/blogCtrl');

// router object
const router = express.Router();

// 1. GET ALL BLOGS (GET)
router.get('/all-blog', getAllBlogsController);

// 2. CREATE BLOG (POST)
router.post('/create-blog', createBlogController);

// 3. UPDATE BLOG (PUT)
router.put('/update-blog/:id', updateBlogController);

// 4. GET SINGLE BLOG (GET)
router.get('/get-blog/:id', getSingleBlogController);

// 5. DELETE BLOG (DELETE)
router.delete('/delete-blog/:id', deleteBlogController);

// 6. SINGLE USER BLOG (GET)
router.get('/user-blog/:id', userBlogController);

module.exports = router;