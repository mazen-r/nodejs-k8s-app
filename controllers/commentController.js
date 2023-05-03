const { Comment, User, Post } = require('../database/models/relations');

const createComment = async (req, res, next) => {
    const { userId: authorId } = req.user;
    const { description, postId } = req.body;
    console.log(authorId)
    if (!description | !postId) {
        return res.status(400).json({message: "You must provide description and post Id"});
    };
    const post = await Post.findByPk(postId)
    if (post) {
        comment = await Comment.create({description, authorId, postId})
        return res.status(200).json({message: "Created comment successfully",
        data: { authorId, postId, description }})
    }
    return res.status(404).json({ message: "This post isn't available" });
}

module.exports = { createComment }