const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    username:String,
    emailid:String,
    password:String,
    confirm:String

})

module.exports = mongoose.model('userdatas', userSchema)