const express=require('express');
const path=require('path');
var port=8003

var app=express()

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'))


app.get('/',function(req,res){
    return res.render('todo',{
        title:"to do things"
    })
});


app.listen(port,function(err){
    if(err){
        console.log("error show",err)
        return;
    }
    console.log("server is running on port",port)
})


