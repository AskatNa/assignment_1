const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000

app.use(bodyParser.urlencoded({extended:true}));

app.get("/bmiCalculator", function (req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html");
})
app.post("/bmiCalculator", function (req, res) {
    console.log(req.body)
    let weight = Number(req.body.weight);
    let height = Number(req.body.height);
    if(height < 0 || weight < 0) {
        res.send(`<div style="font-family: Arial, sans-serif; text-align: center; margin: 250px">
            <p id="Invalid"
               style="background-color: #fbe4e6;  padding: 10px; border-radius: 5px; font-size: 16px; color: #333;">
                Values can’t be less than or equal to 0.
            </p>
            <a href="/bmiCalculator" style="text-decoration: none; color: #4CAF50; font-weight: bold;">Go Back</a>
        </div>`)
        console.log("Values can`t be less than 0")
        return 0;
    } else {
        const bmi = weight / (height * height);
        console.log(bmi)
        let category = '';
        let cssClass = '';
        if (bmi < 18.5) {
            category = 'Underweight';
            cssClass = 'background-color: #3498DB; color: white';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            category = 'Normal weight';
            cssClass = 'background-color: #4CAF50; color: white;';
        } else if (bmi >= 25 && bmi < 29.9) {
            category = 'Overweight';
            cssClass = 'background-color: #FFC107; color: white;';
        } else {
            category = 'obese'
            cssClass = 'background-color: #E74C3C; color: white;';
        }
        res.send(`<div style="font-family: Arial, sans-serif; text-align: center; margin: 250px">
                <p id="Result" style="${cssClass} padding: 10px; border-radius: 5px; font-size: 16px; font-weight: bold;">
                    Your BMI is ${bmi.toFixed(2)} and your category is ${category}.
                </p>
                <a href="/bmiCalculator" style="text-decoration: none; color: #4CAF50; font-weight: bold;">Calculate Again</a>
            </div>`);
    }
})
app.listen(PORT, function (err) {
    if (err) throw err;
    console.log(`Server is active at http://localhost:${5000}`)
})