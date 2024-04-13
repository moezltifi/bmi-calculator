const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({extended : true}))


app.get("/", function(req, res){
    res.sendFile( __dirname + "/index.html")
})

app.post("/", function(req,res){

   
    const weight = Number(req.body.weight)
    const height = Number(req.body.height)/100
    const bmi = weight/Math.pow(height,2)
    const formattedNumber = parseFloat(bmi.toFixed(2));

    const underWeight = "You are classified as underweight"
    const normalWeight = "You are classified as normal weight"
    const overWeight = "You are classified as overwheight"
    const obesity = "You are classified as obese"
    const morbidObisity = "You are classified as morbid obese"

    function getResultPage(color, state) {
        return `<div style="display: flex; justify-content: center;">
                    <div style="margin: 30px 0; padding: 30px 45px 60px;display: flex; justify-content: center;
                        background-color: #eee; color: #${color}; position: relative; width: 50%;">
                        <h1>your BMI is ${formattedNumber} ! ${state}</h1>
                    </div>
                </div>`;
    }
    
    let result;

    if (bmi < 18.5) {
        result = getResultPage("a2bbd2", "You are classified as underweight");
    } else if (bmi >= 18.5 && bmi < 25) {
        result = getResultPage("a4c7a4", "You are classified as normal weight");
    } else if (bmi >= 25 && bmi < 30) {
        result = getResultPage("feda09", "You are classified as overweight");
    } else if (bmi >= 30 && bmi < 40) {
        result = getResultPage("f99f50", "You are classified as obese");
    } else {
        result = getResultPage("ef464d", "You are classified as morbidly obese");
    }

    res.send(result);
})

app.listen(3000,function(req,res){
    console.log("hi");
})