const router = require('express').Router();
const Blog = require('../models/Blog')
// Your routing code goes here
router.get('/blog',async (req,res)=>{
    
    // let user=
    // console.log(req.query)
    try{

        // const search=req.url.split("?")[1].split("&")[1].split("=")[1]
const {page,search} =req.query
        let user=await Blog.find({topic:search}).skip((Number(page)-1)*5).limit(5)
        res.json({status:"success",result:user})
    }        
    catch(e){
        res.json({status:"Failed",result:e.message})
    }
 
})

router.post('/blog',async (req,res)=>{
//   console.log(req.body)
try{
    let user=await Blog.insertMany(req.body)
    res.json({status:"success",result:user})
}
catch(e){
    res.json({status:"Failed",result:e.message})
}
 
})
router.put('/blog/:id',async (req,res)=>{
    // console.log(req.params);
    // console.log(req.body)
    //    let user=await Blog.insertMany(req.body)
    try{
        
        let user=await Blog.updateOne({_id:req.params.id},req.body)
        let particular=await Blog.find({_id:req.params.id})
        res.json({status:"success",result:particular})
    }
    catch(e){
        res.json({status:"Failed",result:e.message})
    } 
})
router.delete('/blog/:id',async (req,res)=>{
    //   console.log(req.body)
    try{
        let particular=await Blog.find({_id:req.params.id})
        let user=await Blog.deleteOne({_id:req.params.id})
       
         res.json({status:"success",result:particular})
    }
    catch(e){
        res.json({status:"Failed",result:e.message})
    } 
        
})


module.exports = router;