const Blog = require("../models/Blog");

exports.getAllBlogs = async (req, res) => {
  const { category, author } = req.query;
  let filter = {};
  if (category) filter.category = category;
  if (author) filter.author = author;

  const blogs = await Blog.find(filter);
  res.json(blogs);
};

exports.createBlog = async (req, res) => {
  const { title, category, author, content, image } = req.body;
  const blog = new Blog({
    title,
    category,
    author,
    content,
    image,
    userId: req.user.id,   
  });
  await blog.save();
  res.status(201).json(blog);
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    if (blog.userId.toString() !== req.user.id) return res.status(403).json({ error: "Not authorized" });

    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    if (blog.userId.toString() !== req.user.id) return res.status(403).json({ error: "Not authorized" });

    await blog.remove();
    res.json({ message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


exports.getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ userId: req.user.id });  // <-- changed here
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch your blogs" });
  }
};
