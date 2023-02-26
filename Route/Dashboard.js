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
 
    let todos;
   
    try {
        
     
        todos = await RegisterSchema.find({ username: username });
    //   if(todos[0].name===""){

    //       todos=await ReactSchema.findOne({username:username})
    //   }
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

router.get("/fullProfile",isAuth,async(req,res)=>{
    
    const username = req.session.user.username;
 
    let todos1;
   
    try {
        
     console.log("break to check")
        todos1= await ItemSchema.findOne({ username: username });
        console.log(todos1);
        // return res.send(todos1.username)
  
   
    } catch (error) {
        console.log(error)
      return res.send({
        status: 400,
        message: "Database error",
        error: error,
      });
    }
  console.log("end")
     return res.render("FullPofile", { todos1: todos1});
  });

  router.get("/add_Profile",(req,res)=>{
    res.render("Profile")
  })
router.post("/add_Profile",isAuth,async(req,res)=>{
    const {state,country,college,username}=req.body
    const s=await RegisterSchema.findOne({_id:req.session.user.userId})
    const usertodo=new ItemSchema({
      
        state:req.body.state,
        country:req.body.country,
        college:req.body.college,
        username:req.session.user.username,
        email:req.session.user.email,
        name:req.session.user.name,
        mobile:req.session.user.mobile


    })

   
    try {
        const text=await usertodo.save();
        // console.log(text)
    //   console.log(text)
        
      res.redirect("/fullProfile")
    } catch (error) {
        return res.send(error)
    }
   

})
router.get("/edit",(req,res)=>{
   return res.render("Edit")
})
router.post('/edit',isAuth,async(req,res)=>{
    const userId=req.session.user.userId
    // console.log(userId)
    const username=req.session.user.username
    const name=req.body.name
    const mobile=req.body.mobile
    const state=req.body.state
    const country=req.body.country
    const college=req.body.college
   
    if(!userId  || !name || !mobile || ! state || !country){
        return res.send("missing cedentials")
    }
    try{
const tododb=await ItemSchema.findOne({username:username})

if(!tododb){
    return res.send("not found")
}

if(tododb.username !== req.session.user.username){
    return res.send("authentication failed")
}
try {
    
    const tododbupdate=await ItemSchema.findOneAndUpdate({username:username},{name:name},{mobile:mobile},{state:state},{country:country},{college:college})
    console.log(tododbupdate)   
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