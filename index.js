require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const host = "localhost";

app.get("*", function (req, res) {
    res.status(404).json({ message: "Esta rota não existe." });
});

app.listen(port, host, () => {
    console.log(`App listen: http://${host}:${port}/`)
});