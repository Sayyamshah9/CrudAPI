//IMPORTING FILES
const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config({
    path:'.env'
})
const userRouter = require('./routes/userRoutes.js')
const crudRouter = require('./routes/crudRoute.js')

const port = process.env.PORT || 5000

//MIDDLEWARE
app.use(express.json())
app.use('/userspage', userRouter)
app.use('/crudpage', crudRouter)

app.get('/', (req,res) => {
    res.send('Hi Working')
})

//CONNECTION TO DATABASE
try{
    mongoose.connect(process.env.DB_CONNECTION,
                    {useNewUrlParser: true},
                    console.log('DB Connected')
                )
}catch(err){
    console.log(err)
}

app.listen(port, ()=>{
    console.log("Server is Up and Running");
})
