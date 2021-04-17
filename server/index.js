const express = require("express");

const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send("Hello, World");
});

app.listen(PORT, () => console.log("Listening on: " + PORT));