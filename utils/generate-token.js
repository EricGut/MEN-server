import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    return jwt.sign({
        name: user.name,
        email: user.email
    }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

export default generateToken;