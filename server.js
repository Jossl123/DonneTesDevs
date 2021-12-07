const manageData = require("./manageData.js")
const express = require("express");
const http = require('http');
const PORT = 3000;
let db
const app = express();
const bodyParser = require('body-parser')
const server = http.createServer(app);
app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
    manageData.addUserToDb("test", "", "")
    manageData.showAllUsers()
});

app.get("/signup", (req, res) => {
    res.sendFile(__dirname + '/views/signup.html')
});

app.post("/submitSignUp", (req, res) => {
    var data = req.body
    console.log(data)
    res.sendFile(__dirname + '/views/signupsuccess.html')
});

server.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});