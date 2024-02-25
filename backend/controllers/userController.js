const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const config = require('config');

const User = require('../models/user');

const signinController = async(req, res) => {
    if (req.body.googleAccessToken) {
        // oauth
        axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                "Authorization": `Bearer ${req.body.googleAccessToken}`
            }
        }).then( async response => {
            const email = response.data.email;

            const alreadyExistUser = await User.findOne({email});
            
            if (!alreadyExistUser) {
                return res.status(400).json({
                    message:"User doesn't exist!"
                })
            }

            const token = jwt.sign({
                email: alreadyExistUser.email,
                id: alreadyExistUser._id
            }, config.get("JWT_SECRET"), {expiresIn: '4h'})
            
            res.status(200).json({result: alreadyExistUser, token})
        })
    } else {
        // email, password
        const {email, password} = req.body;
        
        if(email === '' || password === '') {
            return res.status(400).json({
                message: "Invalid field!"
            })
        }

        try {
            const alreadyExistUser = await User.findOne({email});

            if (!alreadyExistUser) {
                return res.status(400).json({
                    message: "User doesn't exist!"
                })
            }

            const isPasswordCorrect = await bcrypt.compare(password, alreadyExistUser.password);

            if (!isPasswordCorrect) {
                return res.status(400).json({
                    message: "Invalid info!"
                })
            }

            const token = jwt.sign({
                email: alreadyExistUser.email,
                id: alreadyExistUser._id
            }, config.get("JWT_SECRET"), {expiresIn: '4h'})

            res.status(200).json({result: alreadyExistUser, token});
        }catch {
            console.log(err);
        }
    }
}

const signupController = async(req, res) => {
    if (req.body.googleAccessToken) {
        // google oauth
        axios.getAdapter('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                "Authorization": `Bearer ${req.body.googleAccessToken}`
            }
        }).then(async response => {
            const firstName = response.data.given_name;
            const lastName = response.data.family_name;
            const email = response.data.email;
            const picture = response.data.picture;
            
            const alreadyExistUser = await User.findOne({email});

            if (alreadyExistUser) {
                return res.status(400).json({
                    message: "User already exists!"
                })
            }
            
            const result = await User.create(firstName, lastName, email, profilePicture);
            const token = jwt.sign({
                email: result.email,
                id: result._id
            }, config.get('JWT_SECRET'), {expiresIn: '4h'})
            res.status(200).json({result, token})
        }).catch(err => {
            res.status(400).json({
                message: "Invalid info!"
            })
        })
    } else {
        // normal form data
        const {email, firstName, lastName, confirmPassword, password} = req.body;
        
        try {
            if(!email || !firstName || !lastName || !confirmPassword || !password || password.length < 8) {
                res.status(400).json({
                    message: 'Invalid field!'
                })
                const alreadyExistUser = await User.findOne({email});
                if(alreadyExistUser) {
                    return res.status(400).json({message: 'User already exist!'})
                }
                const hashPassword = await bcrypt.hash(password, 9);
                const result = await User.create({password: hashPassword, firstName, lastName, email, profilePicture:picture});

                const token = jwt.sign({
                    email: result.email,
                    id: result._id
                }, config.get("JWT_SECRET"), {expiresIn: '4h'})
                res.status(200).json({result, token})
            }
        } catch(err) {
            console.log(err)
        }
    }
}

module.exports = {
    signinController,
    signupController
}