const express=require("express")
const RegisterSchema=require("./Schema/RegisterSchema")
var validator = require('validator');
var bcrypt = require('bcryptjs');
const {isAuth}=require("../middleware/isAuthentication");

const router=express.Router();

router.get('/login',(req,res)=>{
    return res.render("Login")
})

router.post('/login',async(req,res)=>{
    const log={loginId,password}=req.body;
    if(!loginId || !password){
        return res.send("missing credentials")
    }
    let userdata;
    // console.log(userdata)
    try{
        if(validator.isEmail(loginId)){

            userdata= await RegisterSchema.findOne({email:loginId})
        }else{
            userdata= await RegisterSchema.findOne({username:loginId})
        }
        if(!userdata){
            return res.send("invalid username")
        }
       

      const pass=  bcrypt.compareSync(password, userdata.password); // true
      if(!pass){
        return res.send("invalid")
      }
      // console.log(userdata)
         
      
      //use session based athentication
      //if login true session isAuth set true to store db
      req.session.isAuth=true;

      //push user information to session to find particular user

      req.session.user=({
        username:userdata.username,
        email:userdata.email,
        mobile:userdata.mobile,
        name:userdata.name,
        userId:userdata._id,
      })
      return res.redirect('/dashboard');
    
      //session end
     
    }catch(error){
      return  res.send(error)
    }
   




})
module.exports= router;