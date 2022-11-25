
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { join } = require("path");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));
app.set('view engine', 'ejs');


app.get("/", (req, res) => {
    res.render("index");
});

app.post("/", (req, res) => {
    var location = req.body.place;
    var key = "8969da5d5f6c4afea5c74500222609";
    const url = "https://api.weatherapi.com/v1/current.json?key=" + key + "&q=" + location + "&aqi=yes";

    https.get(url , (response) => {

        console.log('statusCode:', response.statusCode);

        response.on('data', (d) => {
            
            data =JSON.parse(d);
            console.log(data.location.name);
            console.log(data.current.temp_c);
            console.log(data.current.condition.text);
            res.render("weather", {data : data});
        });
    });
    
});

app.listen(8000, () => {
    console.log("listening at port 8000");
});