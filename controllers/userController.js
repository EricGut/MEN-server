import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generate-token.js';

const getUsers = async (req, res) => {
    const users = await User.find();
    try {
        if (users.length !== 0) {
            res.status(200).send(users)
        } else {
            res.status(404).send('No users were found');
        }

    } catch (error) {
        res.status(404).send(error.message)
    }
}

const userSeed = async (req, res) => {
    const userData = {
        name: 'TestUser',
        email: 'test@gmail.com',
        password: await bcrypt.hash('123456', 8)
    }
    const user = new User(userData);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(409).send(error.message)
    }
}

const registerUser = async (req, res) => {
    const userData = req.body;
    const user = await User.findOne({ email: userData.email });
    if (user) {
        res.status(409).send('this user already exists')
    } else {
        try {
            userData.password = await bcrypt.hash(userData.password, 8);
            const newUser = new User(userData);
            await newUser.save();
            const token = generateToken(newUser);
            res.status(201).send({ newUser, token });
        } catch (error) {
            res.status(409).send(error.message)
        }
    }
}

const loginUser = async (req, res) => {
    const userData = req.body;
    const user = await User.findOne({ email: userData.email });
    try {
        if (!user) {
            res.status(409).send('This user does not exist');
        } else {
            const compPass = await bcrypt.compare(userData.password, user.password);
            if (compPass) {
                const token = generateToken(user);
                res.status(200).send({ user, token })
            }
        }
    } catch (error) {
        res.status(403).send(error.message)
    }
}

export { getUsers, userSeed, registerUser, loginUser }