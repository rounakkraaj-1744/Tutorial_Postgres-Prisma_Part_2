const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const port = process.env.PORT || 8080;
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req:any, res: any)=>{
    res.send("This is the signup page of the website");
})

app.get("/login", (req:any, res: any)=>{
    res.send("This is the login page of the website");
})

// Routes
app.use("/auth", authRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
