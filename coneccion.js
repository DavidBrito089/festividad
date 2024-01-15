/*const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hols mundo!')
})

app.get('/about', (req, res) => {
  res.app.use(express.static('public'));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})*/

var express = require("express");
var app = express();
const port = 3000

app.use(express.static("public"));
app.use("/static", express.static("public"));

app.get('/', (req, res) => {
  res.sendFile(__dirname +"/public/index.html");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

console.log("Servidor express escuchando");