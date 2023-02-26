const express=require("express")
var validator = require('validator');

 const clearVali=({name,email,mobile,username,password})=>{
    return new Promise((resolve,reject)=>{
        if(name==="" || username===" "||mobile===""||email===""||password===""){
            return reject("empty filed not allowed")
        }

        if(mobile.length>10 || mobile.length<10){
            return reject("enter valid number")
        }
        if(!validator.isEmail(email)){
            return reject("enter correct email")
        }

        resolve()
    })

}

module.exports={clearVali}