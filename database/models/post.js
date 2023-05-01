const { DataTypes } = require('sequelize');

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
    author: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,   
    }
}, { 
    timestamps: false
});

module.exports = Post;