const  User = require('./user')
const  Post = require('./post')

User.hasMany(Post, { foreignKey: 'authorId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Post.belongsTo(User, { foreignKey: {name: 'authorId', allowNull:false} });



// User.hasMany(Post, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
// Post.belongsTo(User, { foreignKey: 'authorId' });


module.exports = { User, Post }