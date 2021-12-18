const express = require('express')
const router = express.Router()

const crudschema = require('../models/crudSchema')

// POST REQUEST
router.post('/:id', async(req,res) =>{

    const cruddata = new crudschema({
        userid:req.params.id,
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        duedate: req.body.duedate
    })
    try{
        const savecruddata = await cruddata.save()
        res.json({msg:"Task Added"})
    }catch(err){
        res.json({msg:err})
    }
})

//GET CRUD-DATA
//get all crud-data of same userid
router.get('/:id', async (req, res) => {
    try{
        const getallcruddata = await crudschema.find({userid: req.params.id})
        res.json(getallcruddata)
    }catch(err){
        res.json({msg:err})
    }
})

//DELETE REQUEST
router.delete('/:id', async(req,res)=>{
    try{
        const deletecruddata = await crudschema.findByIdAndDelete(req.params.id)
        res.json({msg: "Task Deleted" })
        // console.log('CRUD-data Removed')
    }catch(err){
        res.json({msg: err})
    }
})

//UPDATE CRUD-DATA
router.patch('/:id', async(req,res) => {
    
    userid = req.params.id

    crudschema.findByIdAndUpdate(
        userid,
        {
            title: req.body.title,
            subtitle: req.body.subtitle,
            description: req.body.description,
            duedate: req.body.duedate
        },
        (err) => {
            if(err){
                res.json({msg:err})
            }else{
                res.json({msg:"Updated Successfully"})
            }
        }        
    )
})

module.exports = router