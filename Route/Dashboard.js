const express=require("express");
const session = require("express-session");
const mongoose  = require("mongoose");
const { isAuth } = require("../middleware/isAuthentication");
const RegisterSchema = require("./Schema/RegisterSchema");
const ItemSchema=require('./Schema/TodoItemSchema')
const ObjectId = require("mongodb").ObjectId;
//const { ObjectID } = require("bson");

const router=express.Router();


router.get("/dashboard", isAuth, async (req, res) => {
    const username = req.session.user.username;
    let todos,todos1;
    try {
      //todos = await ItemSchema.find({ username: username });
    todos1=await Register.find({username:username})
       console.log(todos);
  
    //   return res.send({
    //     status:200,
    //     message: "Read success",
    //     data: todos
    //   })
    } catch (error) {
      return res.send({
        status: 400,
        message: "Database error",
        error: error,
      });
    }
  
     return res.render("Dashboard", { todos: todos});
  });


//add item



router.post("/add_Profile",isAuth,async(req,res)=>{
    const {state,country,college,username}=req.body
    const usertodo=new ItemSchema({
      
        state:req.body.state,
        country:req.body.country,
        college:req.body.college,
        username:req.session.user.username,
        email:req.session.user.email
    })
    // console.log(usertodo)
   
    try {
        const text=await usertodo.save();
        console.log(text)
        return res.send(text)
        
    } catch (error) {
        return res.send(error)
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

 
//    //logout

router.post('/logout',isAuth,(req,res)=>{
console.log(req.session)
req.session.destroy((err)=>{
if(err) throw err
return res.redirect('/login')
})
})

// router.post('/logout_devices',isAuth,async(req,res)=>{

//     const username=req.session.user.username;

//     const Schema=mongoose.Schema
//     const sessionSchema=new Schema({_id:String},{strict:false})
//     const sessionModel=mongoose.model("session",sessionSchema)
// try{

//     const del=await sessionModel.deleteMany({
//     "session.user.username":username
// })
// return res.redirect('/login')
// console.log(del)
// }catch(err){
//     return res.send(err)
// }
// })

module.exports= router;