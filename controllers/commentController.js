const { Comment, User, Post } = require('../database/models/relations');

const createComment = async (req, res, next) => {
    const { userId: authorId } = req.user;
    const { description, postId } = req.body;
    if (!description | !postId) {
        return res.status(400).json({message: "You must provide description and post Id"});
    };
    try {
        const post = await Post.findByPk(postId);
        if (post) {
            comment = await Comment.create({description, authorId, postId})
            return res.status(200).json({message: "Created comment successfully",
            data: { authorId, postId, description }})
        };
        return res.status(404).json({ message: "This post isn't available" });
    } catch (err) {
        next(err);
    };
};

const getComments = async (req, res, next) => {
    const postId = req.params.postId;
    try {
        if (postId) {
            const commentsData = await Comment.findAll({where: { postId: postId}});
            if (commentsData.length > 0) {
                const comments = commentsData.map(({ authorId, postId, commentId, description }) => ({
                    authorId, postId, commentId, description }));
                return res.status(200).json({ postId, comments });
            };
        };
        return res.status(400).json({message: "No comments found to this post"});
    } catch (err) {
        next(err);
    };
};

module.exports = { createComment, getComments }