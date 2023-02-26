const mongoose=require("mongoose")

const RegisterSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true
    },
    username:{
        type:String,
        requied:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
})

module.exports=mongoose.model('userdata',RegisterSchema);