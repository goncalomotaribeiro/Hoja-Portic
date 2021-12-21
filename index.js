require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const host = "127.0.0.1";

app.get("*", function (req, res) {
    res.status(404).json({ message: "Route not defined!" });
});

app.listen(port, host, () => {
    console.log(`App listen: http://${host}:${port}/`)
});