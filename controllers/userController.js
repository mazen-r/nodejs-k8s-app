const User = require("../database/models/user");

const getUsers = async (req, res, next) => {
    const id = req.params.id || 1
    const offset = (id - 1) * 10;
    try {
        const usersData = await User.findAll({offset, limit:10});
        if (usersData.length > 0) {
            const filteredUsers = usersData.map(({ userId, userName, email, createdAt }) => ({
                userId, userName, email, createdAt,
            }));
             res.status(200).json({ data: filteredUsers });
        } else {
            res.status(404).json({ message: "No data avaiable" });
        }
    } catch (err) {
        next(err);
    }
};

const getUser = async (req, res, next) => {
    const id = req.params.id
    if (!id) {
        return res.status(400).json({message: "You must include the user ID"});
    }
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({message: `There is no users with the ID ${id}`});
        }
        const { userId, userName, email, verified } = user
        res.status(200).json({
            data: { userId, userName, email, verified }
        });
    } catch (err) {
        next(err)
    };
};

const createUser = async (req, res, next) => {
    const { userName, email, password } = req.body;
    if (!userName | !email | !password) {
        return res.status(400).json({message: "You must include all fields"});
    }
    const user = User.findOne({ where: {email: email}})
    if (user) {
        return res.status(400).json({message: "This email has been registered"});
    }
    try {   
        const userData = await User.create({ userName, email, password });
        const { verified, userId } = userData;
        res.status(200).json({
            message: "Created user successfully",
            data: { userId, userName, email, verified }
        });
    } catch (err) {
        next(err)
    };
};

module.exports = { getUsers, getUser, createUser};