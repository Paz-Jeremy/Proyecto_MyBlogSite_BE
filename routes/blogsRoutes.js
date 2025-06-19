const express = require('express');
const { getAllBlogs, createBlog, updateBlog, deleteBlog, getBlogsByUser } = require('../controllers/blogsController');
const router = express.Router();

router.get("/allBlogs", getAllBlogs);
router.post("/newBlog", createBlog);
router.put("/updateBlog/:id", updateBlog);
router.delete("/deleteBlog/:id", deleteBlog);
router.get("/blogsByUser/:userId", getBlogsByUser);

module.exports = router;