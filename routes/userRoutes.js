const express = require('express')
const router = express.Router()
const {validReg, validLogin} = require('../validation.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authToken = require('../jwtauthentication')

const userschema = require('../models/userSchema')

//POST REQUEST
//for regristration
router.post('/register', async(req,res) => {

    //Validations
    const {error} = validReg(req.body)
    if(error) return res.json({msg:error.details[0].message})
    
    //check if user already exist
    const userexist = await userschema.findOne({emailid: req.body.emailid})
    if(userexist) return res.json({msg: "User already Exist Login to Continue"})

    //Password Hashing
    const salt = await bcrypt.genSalt(11)
    const hashedpass = await bcrypt.hash(req.body.password, salt)


    const user = new userschema(
        {
            username: req.body.username,
            emailid: req.body.emailid,
            password: hashedpass,
            confirm: hashedpass
        }
    )
    try{
        const saveuserdata = await user.save()
        // res.json({msg:"User Created"})
        res.json(
            {msg:"Logged In",
        _id:saveuserdata._id}
        )
    }catch(err){
        res.json({msg:err}) 
    }

})

//for login
router.post('/login', async(req,res) => {

    //validationg user
    const {error} = validLogin(req.body)
    if(error) return res.json({msg: error.details[0].message})

    //checking if email does not already exist
    const emailExist = await userschema.findOne({emailid:req.body.emailid})
    if(!emailExist) return res.json({msg:"Invalid EmailId"})

    //checking if password does not already exist
    const passwordExist = await bcrypt.compare(req.body.password, emailExist.password)
    if(!passwordExist) return res.json({msg:"Invalid Password"})

    const newToken = jwt.sign({_id:emailExist._id}, process.env.TOKEN_KEY)
    res.header('auth_token', newToken)

    res.json(
        {msg:"Logged In",
        _id:emailExist._id,
        username: emailExist.username,
        auth_token: newToken}
        )
})

//GET REQUEST
//get specific user
router.get('/:email',  async (req, res) => {

    try{
        const single_user = await userschema.find({emailid: req.params.email})
        
        if(single_user.length != 0){
            res.json(single_user)
        }else{
            res.json(single_user)
        }
    }catch(err){
        res.json({messaage: err})
    }
})

//GET ALL POSTS
router.get('/', authToken, async (req, res) => {

    try{
        const allusers = await userschema.find()
        res.json(allusers)
    }catch(err){
        res.json({msg:err})
    }
})

//DELETE REQUEST
router.delete('/:id', async (req,res) =>{
    try{
        const deleteuser = await userschema.findByIdAndDelete(req.params.id)
        res.json({msg:"User Deleted"})
    }catch(err){
        res.json({msg:err})
    }
})

module.exports = router