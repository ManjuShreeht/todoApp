const { error } = require("cli")

document.addEventListener("click",function(event){
    if(event.target.classList.contains("edit_me"))
    {
        const id=event.target.getAttribute("data-id")
        const newdata=prompt("enter new todo")
        console.log(id,newdata)
        axios.post('/edit',{id,newdata}.then((res)=>{
            console.log(res)
            return;
        })
        .catch((err)=>{
                console.log(err)
                return;
        }))
        
        console.log("edit")
    }
    if(event.target.classList.contains("delete-me"))
    {
        console.log("delete")
    }
})