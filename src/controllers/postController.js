const  { Post } = require("../database/models/relations");
const redisClient = require('../utils/redis');

const createPost = async (req, res, next) => {
    const { userId: authorId, userName: author } = req.user;
    const { title, description } = req.body;
    try {
        const postsData = await Post.create({ title, description, authorId, author });
        const { postId } = postsData;
        return res.status(200).json({ message: "Created post successfully",
            data: { postId, title, description, author, authorId }
        });
    } catch (err) {
        next(err);
    };
};

const getPosts = async (req, res, next) => {
    const cachekey = req.cacheKey;
    const page = req.params.page || 1;
    const offset = (page - 1) * 10;
    const userId = req.query.userId;
    const whereClause = userId ? { authorId: parseInt(userId) } : {};
    try {
        const postsData = await Post.findAll({where: whereClause}, {offset, limit:10});
        if (postsData.length > 0) {
            const filteredPosts = postsData.map(({ postId, title, description, authorId, author }) => ({
                postId, title, description, authorId, author}));
            const data = { data: filteredPosts }
            await redisClient.set(cachekey, JSON.stringify(data), {EX: 100});
            return res.status(200).json( data );
        };
        return res.status(404).json({ message: "No data avaiable" });
    } catch (err) {
        next(err);
    }
};

const getPost = async (req, res, next) => {
    const postId = parseInt(req.params.postId);
    if (isNaN(postId)) {
        return res.status(400).json({message: "You must provide the post ID"});
    };
    try {
        const postData = await Post.findByPk(postId);
        if (postData) {
            const { title, description, authorId, author } = postData;
            return res.status(200).json({ data: { postId, title, description, authorId, author }}); 
        };
        return res.status(404).json({ message: "No posts avaiable" }); 
    } catch (err) {
        next(err);
    };
};

const updatePost = async (req, res, next) => {
    const postId = parseInt(req.params.postId);
    const { title, description } = req.body;
    const { userId } = req.user;
    if (isNaN(postId)) {
        return res.status(400).json({message: "You must provide the post ID"});
    };
    // try {
        const postData = await Post.findByPk(postId);
        if (postData) {
            if (postData.authorId === userId) {
                const updatedPost = (await Post.update({ title: title, description: description}, { where: {postId: postId}, returning: true}))[1][0];
                const { title: updatedTitle, description: updatedDescription, authorId, author } = updatedPost;
                return res.status(200).json({ data: { postId, title: updatedTitle, description: updatedDescription, authorId, author }});
            };
            return res.status(403).json({message: "You are not authorized"});
        };
        return res.status(404).json({ message: "No posts avaiable" });
    // } catch(err) {
    //     next(err);
    // };
};

const deletePost = async (req, res, next) => {
    const postId = parseInt(req.params.postId);
    const { userId } = req.user
    if (isNaN(postId)) {
        return res.status(400).json({message: "You must provide the post ID"});
    };
    try {
        const postData = await Post.findByPk(postId);
        if (postData) {
            if (postData.authorId === userId) {
                await Post.destroy({ where: { postId: postId}});
                return res.status(200).json({message: "Deleted post successfully"});
            }
            return res.status(403).json({message: "You are not authorized"})
        }
        return res.status(404).json({ message: "No posts avaiable" });
    } catch (err) {
        next(err);
    };
};

module.exports = { createPost, getPosts, getPost, updatePost, deletePost };