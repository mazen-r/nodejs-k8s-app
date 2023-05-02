const User = require('./user')
const Post = require('./post')
const Comment = require('./comment')

User.hasMany(Post, { foreignKey: 'authorId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Post.hasMany(Comment, { foreignKey: 'postId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Post.belongsTo(User, { foreignKey: {name: 'authorId', allowNull:false} });
Comment.belongsTo(Post, { foreignKey: {name: 'postId', allowNull:false} });
Comment.belongsTo(User, { foreignKey: {name: 'authorId', allowNull:false} });

module.exports = { User, Post, Comment }