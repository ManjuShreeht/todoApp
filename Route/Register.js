const express=require("express")
const RegisterSchema=require("./Schema/RegisterSchema")
const {clearVali}=require("../validation/validate");
var bcrypt = require('bcryptjs');



const router=express.Router();

router.get('/register',(req,res)=>{
    console.log(req.session)
    return res.render("Register")
})
router.post('/register', async(req,res)=>{
    const { name, email, password, username } = req.body;
    try{
    await clearVali({name,email,password,username})
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
        username:req.body.username,
        password:hash
    })
    const db=await userdata.save()
    return res.send(db)

}
catch(error){
   return res.send(error)
}
})

module.exports= router;