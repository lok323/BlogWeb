import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const date= new Date();

var hours= date.getHours();
if (hours < 10){
    hours = '0'+date.getHours();
} else {
    hours = date.getHours();
};

var mins= date.getMinutes();
if (mins < 10){
    mins = '0'+date.getMinutes();
} else {
    mins = date.getMinutes();
};

const fullDate= date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
const fullTime = hours+":"+mins;

const data= {
titles:[],
contents:[],
timeStamp: `${fullDate} ${fullTime}`,
};


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/",(req,res) =>{
    res.render("index.ejs",data);
});

app.get("/submit",(req,res) =>{
     res.render("submit.ejs");
});

app.get("/articles/:id",(req,res) =>{
    const postIndex = {post: req.params.id};
    res.render("articles.ejs",{mainData :data, postSeq: postIndex});
});

app.get("/edit/:id",(req,res)=>{
    const editIndex = {post: req.params.id};
    res.render("edit.ejs",{mainData:data, postSeq:editIndex});
})

app.post("/submit",(req,res)=>{
    data.titles.push(req.body["title"]);
    data.contents.push(req.body["content"]);
    res.render("index.ejs",data);
});

app.post("/delete/:id",(req,res)=>{
    data.titles.splice(req.params.id,1);
    data.contents.splice(req.params.id,1);
    res.render("index.ejs",data);
});

app.post("/edit/:id",(req,res)=>{
    data.titles[req.params.id] = req.body["title"];
    data.contents[req.params.id] =req.body["content"];
    res.render("index.ejs",data);
});


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});