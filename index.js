const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const request = require("request");
var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";


app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

// PRICE
app.get("/price", function(req,res){
    res.sendFile(__dirname + "/price.html");
})

app.post("/price", function(req,res){
    var crypto = req.body.crypto;
    var fiat = req.body.money;
    var finalURL = baseURL + crypto + fiat;
    request(finalURL, function (error, response, body) {
        console.log(body);
        var data = JSON.parse(body);
        res.write("<h1>The price of "+ crypto +" is "+ data.last +" "+ fiat +"</h1>")
        res.write("<p>"+ data.display_timestamp +"</p>")
        res.send();
    });
})

// CONVERSION
app.get("/converter", function(req,res){
    res.sendFile(__dirname + "/conversion.html");
})

app.post("/converter", function(req,res){
    var crypto = req.body.crypto;
    var fiat = req.body.money;
    var amount = req.body.amount;

    var option = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        method: "GET",
        qs:{
            from: crypto,
            to: fiat,
            amount: amount
        }
    }

    request(option, function(error, response, body){
        var data = JSON.parse(body);
        res.write("<h1>The price of "+ amount +" in "+ crypto +" is "+ data.price +"</h1>")
        res.write("<p>"+ data.time +"</p>")
        res.send();
    })
});
app.listen(3000, function(){
    console.log("Running on port 3000");
})
