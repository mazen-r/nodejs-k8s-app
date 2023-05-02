const { DataTypes } = require('sequelize');

const db = require('../connection');

const Comment = db.define('Comment', {
    CommentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
}, { 
    timestamps: false
});

module.exports = Comment;