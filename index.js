const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000 ;


// data transfer from postman than we use this
app.use(express.json());

// use cors when we acess in local network

app.use(cors({
    origin: 'http://127.0.0.1:5500',
  }));


app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost:27017/re',{useNewUrlParser: true});
const priyanshu = new mongoose.Schema({
    is_success: Boolean,
    User_ID: Number,
    College_Email_ID: String,
    College_Roll_Number: String,
    numbers: Number,
    alphabets: String,
});

const raj = new mongoose.model('api',priyanshu);



app.post('/post',(req,res)=>{
    console.log(req.body)
    const name = raj(req.body)
    name.save()
    res.send("sucess")
});



app.get('/',(req,res)=>{
    res.send('hello world')
});


app.get('/data', async (req,res)=>{
    const data = await raj.find()
    console.log(data)
    res.json(data)
});



app.listen(port,()=>{
    console.log(`server is runing ${port} ..... `)
});



// we use params replace body . req.body.name because this take value in postman  and search by id
// and use find by id value 