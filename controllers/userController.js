const User = require("../database/models/user");
const { GenerateSalt, GeneratePassword, ValidatePassword, GenerateSignature } = require('../utils/tokens')

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
    const { userName, email, password: uhashedPassword } = req.body;
    if (!userName | !email | !uhashedPassword) {
        return res.status(400).json({message: "You must include all fields"});
    }
    const user = await User.findOne({ where: {email: email}})
    if (user) {
        return res.status(400).json({message: "This email has been registered"});
    }
    try {
        const salt = await GenerateSalt()
        const password = await GeneratePassword(uhashedPassword, salt)
        const userData = await User.create({ userName, email, password, salt });
        const { verified, userId } = userData;
        res.status(200).json({
            message: "Created user successfully",
            data: { userId, userName, email, verified }
        });
    } catch (err) {
        next(err)
    };
};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body
    if (!email | !password) {
        return res.status(400).json({message: "You must include all fields"});
    }
        const user = await User.findOne({ where: { email: email }});
        try {
            if (user) {
                const validPassword = await ValidatePassword(password, user.password, user.salt)
                if (validPassword) {
                    const token = await GenerateSignature({ email: user.email, id: user.id})
                    return res.status(200).json({token})
                }
            }
            return res.status(400).json({message: "Invalid data!"});
        } catch (err) {
            next(err)
        }
}

const deleteUser = async (req, res, next) => {
    const email = req.user
    try {
        await User.destroy({ where: { email: email}})
        return res.status(200).json({message: "Deleted user successfully"});
    } catch(err) {
        next(err)
    }
}

module.exports = { getUsers, getUser, createUser, loginUser, deleteUser };