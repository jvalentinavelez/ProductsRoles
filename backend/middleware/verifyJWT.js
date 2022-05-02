const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization; //authorization can come with a capital letter
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); //if we do not have auth header and it also doesn't starts with Bearer
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            //decoded information from jwt
            if (err) return res.sendStatus(403); //forbidden
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
}

module.exports = verifyJWT