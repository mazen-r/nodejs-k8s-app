const User = require('../database/models/user');
const Post = require('../database/models/post');

const createPost = async (req, res, next) => {
    const email = req.user
    const { title, description } = req.body;
    if (!title | !description) {
        return res.status(400).json({message: "You must add title and description"});
    };
    try {
        const user = await User.findOne({ where: { email: email }});
        const { userId: authorId, userName: author } = user
        const postData = await Post.create({ title, description, authorId, author });
        const { postId } = postData
        return res.status(200).json({ message: "Created post successfully",
            data: { postId, title, description, author, authorId }
        });
    } catch (err) {
        next(err);
    };
};

const getPosts = async (req, res, next) => {
    const page = req.params.page || 1
    const offset = (page - 1) * 10;
    try {
        const postsData = await Post.findAll({offset, limit:10});
        console.log(postsData)
        if (postsData.length > 0) {
            const filteredPosts = postsData.map(({ postId, title, description, authorId, author }) => ({
                postId, title, description, authorId, author}));
            return res.status(200).json({ data: filteredPosts });
        };
        return res.status(404).json({ message: "No data avaiable" });
    } catch (err) {
        next(err);
    }
};

module.exports = { createPost, getPosts }