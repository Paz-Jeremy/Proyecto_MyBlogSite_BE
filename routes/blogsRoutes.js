const express = require('express');
const { getAllBlogs, createBlog, updateBlog, deleteBlog } = require('../controllers/blogsController');
const router = express.Router();

router.get("/allBlogs", getAllBlogs);
router.post("/newBlog", createBlog);
router.put("/updateBlog/:id", updateBlog);
router.delete("/deleteBlog/:id", deleteBlog);

module.exports = router;