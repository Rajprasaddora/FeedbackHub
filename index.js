const express = require("express");
//node js don't have ES15 module access so import will not work
const mongoose = require("mongoose");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");
const authRoutes = require("./routes/authRoutes");
const cookieSession = require("cookie-session");
const passport = require("passport");

const app = express();
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey],
    })
);
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
mongoose
    .connect(keys.mongoURI)
    .then(() => {
        console.log("connected database");
    })
    .catch((err) => {
        console.log("got error->\n", err);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT);
