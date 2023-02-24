import express from "express"
import mongoose from "mongoose";

const adduser=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true,
        unique:true
        
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
    
   
}, {strict:false})



export default mongoose.model('todouser',adduser);