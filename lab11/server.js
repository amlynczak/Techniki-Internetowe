const express = require('express');
const bodyParser= require('body-parser');
const mongodb = require('mongodb');
var db;
const dbname = "1mlynczak";
const url = "mongodb://1mlynczak:pass1mlynczak@172.20.44.25/1mlynczak";
 
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
 
mongodb.MongoClient.connect(url, function(err, client) {
   if (err) {
     console.log('Error connecting to MongoDB:', err);
     return;
   }
   db = client.db(dbname);
   console.log('Connected to MongoDB');
});
 
app.listen(7009,function() {
   console.log('listening on 7009')
});
 
app.get("/", function(req,res) {
  res.sendFile(__dirname + '/index.html')
});
 
app.get("/form", function(req,res) {
  res.sendFile(__dirname + '/form.html')
});
 
app.post("/stud", function( req,res ) {
   console.log(req.body)
   db.collection("stud").insertOne(req.body,function(err,result) {
      if (err) return console.log(err)
      console.log('Rekord dodany do bazy')
      res.end('{"inserted record":"'+result.insertedCount+'"}')
   });
});
 
app.get("/stud", function(req, res) {
  var cursor = db.collection("stud").find().toArray(function(err, results) {
     if (err) return console.log(err)
     res.end(JSON.stringify(results))
     console.log(results) 
  });
});

app.get("/stud/:id", function(req,res) {
   console.log(req.params.id)
   db.collection("stud").findOne({_id: new mongodb.ObjectId(req.params.id)},function(err,result) {
       if (err) return console.log(err)
       res.end(JSON.stringify(result))
       console.log(result)
   });	   
});

app.delete("/stud/:id",function(req, res) {
   console.log(req.params.id)
   db.collection("stud").deleteOne({_id: new mongodb.ObjectId(req.params.id)},function(err,result) {
      if (err) return console.log(err)
      console.log('Rekord usuniety z bazy - '+req.params.id)
      res.end('"Documents deleted ":"1"}')
   });
});

app.put("/stud/:id",function(req,res) {
   console.log(req.params.id)
   console.log(req.body)	
   data = req.body
   db.collection("stud").updateOne({_id: new mongodb.ObjectId(req.params.id)},{ $set: data}, function(err,result) {
      if (err) return console.log(err)
      console.log('rekord poprawiony - '+req.params.id)
      console.log( result.modifiedCount )
      console.log( result.matchedCount )
      res.end('"Document updated ":"'+result.modifiedCount+'"}')
  });	   
});