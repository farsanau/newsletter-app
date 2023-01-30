const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https =require("https");
var mysql = require("mysql");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
  res.sendFile(__dirname+"/signup.html");
})

app.get('/subscribers',(req,res)=>{
  res.sendFile(__dirname+"/subscribers.html");
})

app.post('/signup',(req,res)=>{
const firstName= req.body.fName;
const lastName= req.body.lName;
const email=req.body.email;

var con = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  database: "subscribers_info",
  password: ""
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

let query = "INSERT INTO subscribers(firstname, lastname, email) VALUES(?,?,?)";

  con.query(query, [firstName, lastName, email], function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });

});

console.log(firstName, lastName, email);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

//api key
//1e6fb882bb8e0b3d13c81585959129a1-us18

//audience // IDEA:
//666402f829
