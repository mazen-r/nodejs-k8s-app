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
                const comments = commentsData.map(({ authorId, postId, CommentId, description }) => ({
                    authorId, postId, CommentId, description }));
                return res.status(200).json({ postId, comments });
            };
        };
        return res.status(404).json({message: "No comments found to this post"});
    } catch (err) {
        next(err);
    };
};

const updateComment = async (req, res, next) => {
    const commentId = req.params.commentId;
    const { userId } = req.user;
    const { description } = req.body;
    if (!commentId) {
        return res.status(400).json({message: "Please provide the comment Id"});
    }
    try {
        const commentData = await Comment.findByPk(commentId);
        if (commentData) {
            if (commentData.authorId === userId) {
                const updatedComment = (await Comment.update({ description: description}, { where: {CommentId: commentId}, returning: true}))[1][0];
                const { description: updatedDescription } = updatedComment;
                return res.status(200).json({ data: { authorId: userId, commentId, description: updatedDescription }});
            }
            return res.status(403).json({message: "You are not authorized"});
        };
        return res.status(404).json({message: "No comments with this Id"});
    } catch (err) {
        next(err);
    };
};

const deleteComment = async (req, res, next) => {
    const commentId = req.params.commentId;
    const { userId } = req.user;
    if (!commentId) {
        return res.status(400).json({message: "Please provide the comment Id"});        
    };
    try {
        const commentData = await Comment.findByPk(commentId);
        if (commentData) {
            if (commentData.authorId === userId) {
                await Comment.destroy({where: {CommentId: commentId}});
                return res.status(200).json({message: "Deleted post successfully"});
            };
            return res.status(403).json({message: "You are not authorized"});
        };
        return res.status(404).json({message: "No comment found with this Id"});
    } catch (err) {
        next(err);
    };
};

module.exports = { createComment, getComments, updateComment, deleteComment }