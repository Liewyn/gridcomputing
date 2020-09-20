const express = require("express");
var cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());

//Routes
app.use(require("./routes/main.routes"));

app.listen(8080, () => {
    console.log("app listening on this port");
})


