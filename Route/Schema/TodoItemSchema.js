const express=require("express");
const mongoose=require("mongoose")

const ItemSchema=new mongoose.Schema({
    state:{
        type:String,
        require:true,
    },
    country:{
        type:String,
        require:true
    },
    college:{
        type:String,
        required:true
    },
        username:{
        type:String,
        require:true
    }
})

module.exports=mongoose.model("Todoitem",ItemSchema)