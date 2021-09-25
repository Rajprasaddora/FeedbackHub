const express = require("express");
//node js don't have ES15 module access so import will not work
const mongoose = require("mongoose");
const keys = require("./config/keys");
require("./models/User");
require("./models/Survey");
require("./services/passport");
const authRoutes = require("./routes/authRoutes");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const connectDB = async () => {
    try {
        await mongoose.connect(keys.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.log("got error while connecting to database->\n", err);
    }
};
connectDB();
// mongoose.set("bufferCommands", false);
const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey],
    })
);
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
