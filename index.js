const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const request = require("request");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    var crypto = req.body.crypto;
    var fiat = req.body.money;

    var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
    var finalURL = baseURL + crypto + fiat;
    request(finalURL, function (error, response, body) {
        console.log(body);
        var data = JSON.parse(body);
        res.write("<h1>The price of "+ crypto +" is "+ data.last +" "+ fiat +"</h1>")
        res.write("<p>"+ data.display_timestamp +"</p>")
        res.send();
    });
})
app.listen(3000, function(){
    console.log("Running on port 3000");
});