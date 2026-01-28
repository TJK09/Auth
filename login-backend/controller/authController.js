const jwt = require('jsonwebtoken')
const User = require("../models/User")
const bcrypt = require('bcrypt')


const SECRET_KEY = 'mysecretkey'


exports.signup = async (req, res)=>{
    const {username, email, password} = req.body;

    if(!username || !password || !email){
        return res.status(400).json({"message":"Enter complete information"})
    }
    
    
    const existingUser = await User.findOne({
        $or: [{email},{username}]
    })

    if(existingUser){
        return res.status(409).json({"message":"User already exists"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)
    

    const user = await User.create({
        username,
        email,
        password: hashed
    })
    const token = jwt.sign({username:user.username, role:user.role},SECRET_KEY,{expiresIn:"1h"})

    res.status(201).json({"message":"User Created Successfully",token})
}

exports.login = async (req,res)=>{
    const {username,password} = req.body
    if(!username || !password){
        return res.status(400).json({"message":"Enter Email or Password to Login"})
    }
    const checkuser = await User.findOne({
        username
    })
    if(!checkuser){
        return res.status(401).json({"message":"Invalid Credenials"})
    }

    const isMatch = await bcrypt.compare(password, checkuser.password)
    if(!isMatch){
        return res.status(401).json({"message": "Invalid Credentials"})
    }

    const token = jwt.sign({username:checkuser.username , role:checkuser.role},SECRET_KEY,{expiresIn:"1h"})
    res.status(201).json({"message":"User Logged in succesful",token})
}

exports.dashboard = async (req,res) => {
    const currentUser = req.user
    const users = await User.find().select('-password')
    res.json({
        message:`Welcome ${currentUser.username}! Role:${currentUser.role}`,
        totalUsers: users.length,
        users
    })
}

