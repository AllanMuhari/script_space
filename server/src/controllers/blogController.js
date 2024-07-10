import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createBlog = async (req, res) => {
  const { title, content } = req.body;
  const { userId } = req.user;

  try {
    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: "Failed to create blog" });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        author: true,
      },
    });
    res.json(blogs);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch blogs" });
  }
};

export const getHighlightedBlogs = async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      include: {
        author: true,
      },
      orderBy: {
        likedByCount: "desc",
      },
      take: 5,
    });
    res.json(blogs);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch highlighted blogs" });
  }
};

export const likeBlog = async (req, res) => {
  const { blogId } = req.params;
  const { userId } = req.user;

  try {
    const like = await prisma.likedBlog.create({
      data: {
        blogId,
        userId,
      },
    });
    await prisma.blog.update({
      where: { blogId },
      data: { likedByCount: { increment: 1 } },
    });
    res.status(201).json(like);
  } catch (error) {
    res.status(400).json({ error: "Failed to like blog" });
  }
};

export const getBlogById = async (req, res) => {
  const { blogId } = req.params;

  try {
    const blog = await prisma.blog.findUnique({
      where: { blogId },
    });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch blog" });
  }
};

export const getMyBlogs = async (req, res) => {
  const { userId } = req.user;

  try {
    const blogs = await prisma.blog.findMany({
      where: { authorId: userId },
      include: { author: true },
    });

    res.json(blogs);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch my blogs" });
  }
};

export const deleteMyBlog = async (req, res) => {
  const { userId } = req.user;
  const { blogId } = req.params;

  try {
    const blog = await prisma.blog.findUnique({
      where: { blogId },
    });

    if (blog.authorId !== userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this blog" });
    }

    await prisma.blog.delete({
      where: { blogId },
    });

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete blog" });
  }
};

export const editMyBlog = async (req, res) => {
  const { userId } = req.user;
  const { blogId } = req.params;
  const { title, content } = req.body;

  try {
    const blog = await prisma.blog.findUnique({
      where: { blogId },
    });

    if (blog.authorId !== userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to edit this blog" });
    }

    const updatedBlog = await prisma.blog.update({
      where: { blogId },
      data: { title, content },
    });

    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ error: "Failed to update blog" });
  }
};

