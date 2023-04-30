const { DataTypes, Sequelize } = require('sequelize');

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
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        get() {
            return User.findByPk(this.authorId).then(user => user.userName);
        },        
    },
});

User.hasMany(Post);
Post.belongsTo(User, { foreignKey: 'authorId' });

module.exports = Post;