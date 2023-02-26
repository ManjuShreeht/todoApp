const express=require("express")
const RegisterSchema=require("./Schema/RegisterSchema")
const {clearVali}=require("../validation/validate");
var bcrypt = require('bcryptjs');



const router=express.Router();

router.get('/',(req,res)=>{
    console.log(req.session)
    return res.render("Register")
})
router.post('/', async(req,res)=>{
    const { name, email,mobile, password, username } = req.body;
    try{
    await clearVali({name,email,mobile,password,username})
    let userExit;
    try {
        userExit=await RegisterSchema.findOne({email})
       
        
    } catch (error) {
        res.send(error)
        
    }

    console.log(userExit)
    if(userExit){
   return res.send("user exits")
    }

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    const userdata=new RegisterSchema({
        name:req.body.name,
        email:req.body.email,
        mobile:req.body.mobile,
        username:req.body.username,
        password:hash
    })
    const db=await userdata.save()
    return res.redirect("Login")

}
catch(error){
   return res.send(error)
}
})

module.exports= router;