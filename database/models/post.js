const { DataTypes } = require('sequelize');

const User = require('./user')
const db = require('../connection');

const Post = db.define('Post', {
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        references: {
          model: User,
          key: 'userId',
        },
      },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        references: {
            model: User,
            key: 'userName'
        },
    },
});

User.hasMany(Post);
Post.belongsTo(User, { foreignKey: 'authorId' });

module.exports = Post;