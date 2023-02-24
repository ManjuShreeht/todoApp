const express=require("express")
var validator = require('validator');

 const clearVali=({name,email,username,password})=>{
    return new Promise((resolve,reject)=>{
        if(name==="" || username===" "||email===""||password===""){
            return reject("empty filed not allowed")
        }

        if(!validator.isEmail(email)){
            return reject("enter correct email")
        }

        resolve()
    })

}

module.exports={clearVali}