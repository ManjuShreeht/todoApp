const express=require("express");
const mongoose=require("mongoose")

const ItemSchema=new mongoose.Schema({
    todo:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        require:true
    }
})

module.exports=mongoose.model("Todoitem",ItemSchema)