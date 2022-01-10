const router = require('express').Router()

const crudschema = require('../models/crudSchema')
const authToken = require('../jwtauthentication')

// POST REQUEST
router.post('/:id', async(req,res) =>{

    // let ddate = "2021" + "-" + req.body.duedate

    const cruddata = new crudschema({
        userid:req.params.id,
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        duedate: new Date(req.body.duedate).toDateString()
    })
    try{
        const savecruddata = await cruddata.save()
        res.json({msg:"New Task Created"})
    }catch(err){
        res.json({msg:err})
    }
})

//GET CRUD-DATA
//get all crud-data of same userid
router.get('/:id', authToken, async (req, res) => {
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

    crudschema.findByIdAndUpdate(
        req.params.id,
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