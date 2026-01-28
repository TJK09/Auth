const jwt = require('jsonwebtoken')
const SECRET_KEY = 'mysecretkey';

module.exports = (req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({ message: "No token provided"})
    }   
    const user = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(user, SECRET_KEY)
        req.user = decoded
        next();
    } 
    catch{
        return res.status(401).json({message: "Invalid token"})
    }

}