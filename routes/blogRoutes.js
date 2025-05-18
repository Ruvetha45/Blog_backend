const express = require("express");
const router = express.Router();

const {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getMyBlogs,
} = require("../controllers/blogController");

// import name
const authMiddleware = require("../middlewares/authMiddleware.js");

// Public route
router.get("/", getAllBlogs);

// Private route 
router.get("/myblogs", authMiddleware, getMyBlogs);
router.post("/", authMiddleware, createBlog);
router.put("/:id", authMiddleware, updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;
