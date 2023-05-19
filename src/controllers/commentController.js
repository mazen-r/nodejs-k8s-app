const { Comment, Post } = require('../database/models/relations');
const redisClient = require('../utils/redis');

const createComment = async (req, res, next) => {
    const { userId: authorId, userName } = req.user;
    const { description, postId } = req.body;
    try {
        const post = await Post.findByPk(postId);
        if (post) {
            const { CommentId } = await Comment.create({description, authorId, postId});
            return res.status(200).json({message: "Created comment successfully",
             data: {postId, authorId, userName, commentId: CommentId, description}});
        };
        return res.status(404).json({ message: "This post isn't available" });
    } catch (err) {
        next(err);
    };
};

const getComments = async ( req, res, next) => {
    const postId = parseInt(req.params.postId);
    const cachekey = req.cacheKey;
    if (isNaN(postId)) {
        return res.status(400).json({message: "You must provide description and post Id"});
    };
    try {
        const comments = await Comment.findAll({where: { postId: postId}});
        if (comments.length > 0) {
            const commentsData = comments.map(({ authorId, postId, CommentId, description }) => ({
                authorId, postId, CommentId, description }));
            const data = { postId, commentsData }
            await redisClient.set(cachekey, JSON.stringify(data), {EX: 100});
            return res.status(200).json( data );
        };
        return res.status(404).json({message: "No comments found to this post"});
    } catch (err) {
        next(err);
    };
};

const updateComment = async (req, res, next) => {
    const commentId = parseInt(req.params.commentId);
    const { userId, userName } = req.user;
    const { description } = req.body;
    if (isNaN(commentId)) {
        return res.status(400).json({message: "Please provide the comment Id"});
    }
    try {
        const commentData = await Comment.findByPk(commentId);
        if (commentData) {
            if (commentData.authorId === userId) {
                const updatedComment = (await Comment.update({ description: description}, { where: {CommentId: commentId}, returning: true}))[1][0];
                const { description: updatedDescription } = updatedComment;
                return res.status(200).json({ message: "Updated comment successfully!",
                 data: { authorId: userId, userName, commentId, description: updatedDescription }});
            };
            return res.status(403).json({message: "You are not authorized"});
        };
        return res.status(404).json({message: "No comments found with this Id"});
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