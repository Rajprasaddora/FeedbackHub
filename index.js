const express = require("express");
//node js don't have ES15 module access so import will not work
const app = express();

app.get("/", (req, res) => {
    res.send({ hi: "there" });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT);
