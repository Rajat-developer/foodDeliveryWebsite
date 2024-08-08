const express = require('express');
const app = express();
const port = 5000;
const connectToMongoDB = require("./db");
const cors = require('cors');
const path= require('path')
app.use(cors());

connectToMongoDB(); 

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type,Accept"
    );
    next();
    
})
app.use(express.json())
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));

// static files
app.use(express.static(path.join(__dirname,'./client/build')))
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
