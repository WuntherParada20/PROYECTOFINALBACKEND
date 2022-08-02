const router = require('express').Router();
const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');

//Validation
const validatorHandler = require('../../../../middlewares/validator.handler');
const { userRegisterSchema, loginSchema } = require('../../../../schemas/auth.schema');

//Models
const User = require('../../../../dao/users/user.model');
const userModel = new User();

//Utils
const { hashPassword, comparePassword } = require('../../../../utils/encryption.utils');

router.post('/register',
    validatorHandler(userRegisterSchema, 'body'),
    async (req, res, next) => {
        try {
            const data = req.body;

            const insertData = {
                username: data.username,
                password: await hashPassword(data.password)
            }

            const user = await userModel.new(insertData);

            user.username = data.username;
            user._id = user.insertedId;
            delete user.insertedId;

            const payload = {
                userId: user.insertedId,
            }

            const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10d' });

            res.status(200).json({
                status: 'success',
                user,
                accessToken
            });
        } catch (error) {
            next(error);
        }
    }
);

router.post('/login',
    validatorHandler(loginSchema, 'body'),
    async (req, res, next) => {
        try {
            const { username, password } = req.body;

            const user = await userModel.findByUsername(username);

            if (!user) {
                throw boom.unauthorized();
            }

            const isMatch = await comparePassword(password, user.password);
            
            if (!isMatch) {
                throw boom.unauthorized();
            }

            const payload = {
                userId: user._id,
            }

            const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10d' });
            delete user.password;

            res.status(200).json({
                status: 'success',
                user,
                accessToken
            });

        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
