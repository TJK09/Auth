const mongoose = require('mongoose')

const userschema = new mongoose.Schema(
    {
        username:{
            type : String,
            required : true,
            trim : true,
            unique : true
        },
        email:{
            type: String,
            required : true,
            lowercase : true
        },
        password:{
            type : String,
            required : true,
            minlength : 6,
        }
    },
    {timestamps:true}
)

module.exports = mongoose.model("User",userschema)