//to protect route 

const isAuth=((req,res,next)=>{
if(req.session.isAuth){
    next();
}else{
    return res.send("invalid session")
}

})
module.exports={isAuth}