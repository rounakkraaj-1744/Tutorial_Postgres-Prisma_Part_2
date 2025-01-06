const express = require("express");
const app = express();
const cors = require ("cors");
const port = process.env.PORT || 8080;
require("dotenv").config();

app.use(cors());
app.use (express.json());

app.get("/", (req, res)=>{
    res.send("This is the homepage of the website");
})

app.listen(port, ()=>{
    console.log (`Server started on http://localhost:${port}`);
})