const mongoose = require('mongoose')

const crudSchema = mongoose.Schema({

    userid:String,
    title:String,
    subtitle:String,
    description:String,
    duedate:String

})

module.exports = mongoose.model('cruddatas', crudSchema)

/*
    {
        username:
        emailid:
        password:
        Password:
        tasks [
            {
               title: task1
               subtitle: 
            },
             {
               title: task1
               subtitle: 
            },
        ]
    }

*/