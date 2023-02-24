const express=require('express')
const mongoose=require("mongoose")
const LoginRoute=require('./Route/Login.js')
const RegisterRoute=require('./Route/Register.js')
const DashRoute=require('./Route/Dashboard.js')
const ObjectId = require("mongodb").ObjectId;
// var bcrypt = require('bcryptjs');
const session=require("express-session") //session
const mongoDbSession=require("connect-mongodb-session")(session) //session location

const app=express();

//middle ware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"));
//ejs 
app.set("view engine", "ejs")
const PORT=process.env.PORT || 4000
// app.use("/Dashboard",DashRoute)

mongoose.set('strictQuery', false)
const URl="mongodb+srv://manjushree:manjushree123@cluster0.9vzini2.mongodb.net/TodoApp?retryWrites=true&w=majority";
mongoose.connect(URl).then((res)=>{
    console.log("connected")
}).catch((err)=>{
    console.log(err)
})
//session part 
//session responsible for storing on client side
//middleware

//session schema 
const store=new mongoDbSession({
uri:URl,
collection:"sessions"
}) 

app.use(session({
    secret:'this your todo app',
    resave:false,
    saveUninitialized:false,
    store:store

}))

//session end

app.use("/",LoginRoute)
app.use("/",RegisterRoute)
app.use("/",DashRoute)

app.listen(PORT,()=>{
    console.log("hi")
})











//


// //const store = mongoDbSession.store || mongoDbSession.session.store;  
// const store=new mongodbstore({
//     uri:URL,
//     collection:"sessions"
// })
// app.use(session({
//     secret:"This is todo app",
//     resave:false,
//     saveUninitialized:false,
//     store:store
// }))

// app.use("/",registerRoute)
// app.use("/",LoginRoute)


// // app.get('/homepage',isAuth,(req,res)=>{
   
// //         console.log(req.session)
// //         return res.send("home page")

    
// // })
// app.post("/create-item",isAuth,async(req,res)=>{
  
   
//     const todotext=req.body.todo;
   
//     const username=req.session.user.username

//     if(!todotext){
//         return res.send("missing text")
//     }
//     if(typeof todotext!=='string'){
//         return res.send("invalid format")
//     }
//     if(todotext.length<3 || todotext.length>50)
//     {
//         return res.send("length range 5 t0 50")
//     }
//     const todo=new todoSchema({
//         todo:todotext,
//         username:username
//     })
//     try {
        
//         const todos= await  todo.save()
//          return res.send(todos)
//     } catch (error) {
//         res.send(err)
//     }

// })
// app.post("/edit-item",async(req,res)=>{
//     console.log(req.body);
//     const id=req.body.id;
//     const newdata=req.body.newdata;
//     if(!id || !newdata){
//         return res.send("missing credentials")
//     }
    
//     try {
//         const todobd=await todoSchema.findOne({_id:id})
//         console.log(todobd)
//         if(todobd.username !== req.session.user.username){
//             return res.send("invalid access")
//         }
//         try {
//            const todobd=await todoSchema.findOneAndUpdate({_id:id},{todo:newdata}) 
//         return res.send(todobd)
//         } catch (err) {
//            return res.send("db err") 
//         }
      
//     } catch (error) {
//         console.log(error)
//     }
//     return res.send()
// })

// app.post('/delete-item',isAuth,async(req,res)=>{
//     const id=req.body.id
//     if(!id){
//         return res.send("missing credentials")
//     }
//     console.log(isObjectIdOrHexString(id))
//     if(!ObjectID(id)){
//         return res.send("invalid")
//     }

// })

// app.get("/dashboard",isAuth,(req,res)=>{
//     return res.render("dashboard")
// })



// app.listen(PORT,()=>{
//     console.log(clc.yellow("hiiiii"))
// })