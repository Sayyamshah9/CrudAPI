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
        res.json(savecruddata)
    }catch(err){
        res.json({message:err})
    }
})

//GET CRUD-DATA
//get all crud-data of same userid
router.get('/:id', async (req, res) => {
    try{
        const getallcruddata = await crudschema.find({userid: req.params.id})
        res.json(getallcruddata)
    }catch(err){
        res.json({message:err})
    }
})

//DELETE REQUEST
router.delete('/:id', async(req,res)=>{
    try{
        const deletecruddata = await crudschema.findByIdAndDelete(req.params.id)
        res.json({deletestatus: 'CRUD-data Removed' })
        // console.log('CRUD-data Removed')
    }catch(err){
        res.json({message: err})
    }
})

//UPDATE CRUD-DATA
router.patch('/:id', async(req,res) => {
    
    idtoupdate = req.params.id

    crudschema.findByIdAndUpdate(
        idtoupdate,
        {
            title: req.body.title,
            subtitle: req.body.subtitle,
            description: req.body.description,
            duedate: req.body.duedate
        },
        (err) => {
            if(err){
                res.json({updatestatus:err})
            }else{
                res.json({updatestatus:'successful'})
            }
        }        
    )
})

module.exports = router