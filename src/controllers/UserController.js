const CreateError = require('http-errors');

const User = require('../models/User');

const createUser = async (req, res) => {
    const user = User.build(req.body);
    try {
        await user.save();
        res.status(201).json({
            status: 'success',
            data: user,
        });
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ['password'],
            }
        });
        res.status(200).json({
            status: 'success',
            data: users,
        });
    } catch (error) {
        console.log(error);
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByPk(id);
        if (!user) throw new CreateError(404, 'User not found!');
        res.status(200).json({
            status: 'success',
            data: user,
        })
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

const updateUserById = async (req, res) => {
    const id = req.params.id;
    const allowedUpdates = User.fillables;
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    try {
        if (!isValidOperation) throw new CreateError(400, 'Invalid Update Operation!!');

        const user = await User.findOne({
            where: {
                id
            }
        })

        if (!user) throw new CreateError(404, 'User Not Found!!');

        const data = req.body;
        updates.forEach(update => {
            user[update] = data[update];
        })
        await user.save({ fields: updates });
        res.status(200).json({
            status: 'success',
            data: user,
        })

    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

const deleteUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByPk(id);

        if (!user) throw new CreateError(404, 'User does not exist!!!');

        await user.destroy();
        res.status(200).json({
            status: 'success',
            data: user,
        })
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

const getUserProperties = async (req, res) => {
    const user = req.user;

    try {
        const properties = await user.getProperties();
        res.status(200).json({
            status: 'success',
            data: properties,
        })
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserProperties,
    updateUserById,
    deleteUserById,
}