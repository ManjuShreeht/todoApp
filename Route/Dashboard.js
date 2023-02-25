const express=require("express");
const session = require("express-session");
const mongoose  = require("mongoose");
const { isAuth } = require("../middleware/isAuthentication");
const ItemSchema=require('./Schema/TodoItemSchema')
const ObjectId = require("mongodb").ObjectId;
//const { ObjectID } = require("bson");

const router=express.Router();


router.get('/dashboard',isAuth,async(req,res)=>{
//     const  username=req.session.user.username
//    let todos=[];
//     try{
//        todos=await ItemSchema.find({username:username})
//         console.log(todos)
    
//     }catch(err){
//         console.log(err)
//     }

    return res.render("Dashboard")
})


//add item


router.post("/add_todo",isAuth,async(req,res)=>{
    const {todo,username}=req.body
    const usertodo=new ItemSchema({
        todo:req.body.todo,
        username:req.session.user.username
    })
    console.log(usertodo)
    if(!todo){
        return res.send("invalid text")
    }
    try {
        const text=await usertodo.save();
        return res.send(text)
        
    } catch (error) {
        return res.send(err)
    }
   

})
router.post('/edit',isAuth,async(req,res)=>{
    const id=req.body.id
    const newdata=req.body.newdata
    if(!id || !newdata){
        return res.send("missing todo")
    }
    try{
const tododb=await ItemSchema.findOne({_id:id})
if(!tododb){
    return res.send("not found")
}
console.log(tododb)
if(tododb.username !== req.session.user.username){
    return res.send("authentication failed")
}
try {
    
    const tododbupdate=await ItemSchema.findOneAndUpdate({_id:id},{todo:newdata})
       return res.send(tododbupdate)     
} catch (error) {
    return res.send(error)
}

//const s=ItemSchema.findOneAndUpdate({username:username})
    }catch(errr){
        return res.send(errr);
    }
})

//delete

 router.post("/delete", isAuth, async (req, res) => {
    const id=req.body.id;
   
        if(!id){
            return res.send("missing id")
        }
        try{
       if(new ObjectId(id)){
        try {
            const s=await ItemSchema.findOne({_id:new ObjectId(id)})
            if(s){
               const m=await ItemSchema.findOneAndDelete({_id:new ObjectId(id)})
               console.log(m)

            }
            console.log("hi");
            
        } catch (error) {
            console.log(error)
        }
       }}
       catch(err){
        console.log(err)
       }

     
  

})
//    //logout

router.post('/logout',isAuth,(req,res)=>{
console.log(req.session)
req.session.destroy((err)=>{
if(err) throw err
return res.redirect('/login')
})
})

router.post('/logout_devices',isAuth,async(req,res)=>{

    const username=req.session.user.username;

    const Schema=mongoose.Schema
    const sessionSchema=new Schema({_id:String},{strict:false})
    const sessionModel=mongoose.model("session",sessionSchema)
try{

    const del=await sessionModel.deleteMany({
    "session.user.username":username
})
return res.redirect('/login')
console.log(del)
}catch(err){
    return res.send(err)
}
})

module.exports= router;