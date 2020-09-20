const { Router } = require("express");
const express = require("express");
const router = express.Router();

var respuestasReales = [1,2,0]

router.get("/", (req,res) => {
    res.end("<h1> test 1 </h1>");
})

router.post("/confirmar",(req,res) =>{
    let respuestas = JSON.parse(req.body.respuestas);
    let numCorrectas = 0
    respuestas.forEach((rta,i)=>{
        if (respuestas[i] == respuestasReales[i]) numCorrectas++;
    })

    res.json({correctas:numCorrectas})
})

router.all("*", (req, res) => {
    res.end("404")
});

module.exports = router;