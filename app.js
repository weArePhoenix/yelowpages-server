const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const books = require("./routes/books");
const users = require("./routes/users");
const wishlists = require("./routes/wishlists");
const reviews = require("./routes/reviews");
const login = require("./routes/login");
const forgetPassword = require("./routes/forget-password")
const verifyAccount = require("./routes/verify-account")

//Internal imports
const {
    notFoundError,
    errorHandelar,
} = require("./middleware/common/errorHandelar");
const auth = require("./middleware/permission/auth");

//express app
const app = express();
app.use(cors());

//Env configaration
dotenv.config();
//Database connection
mongoose
    .connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database connection sucessfull"))
    .catch(err => console.log(err));

//Request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set static folder
app.use(express.static(path.join(__dirname, "public")));
app.use(
    "/bookimage",
    express.static(path.join(__dirname, "public/uploads/bookImage/"))
);
app.use(
    "/default_images",
    express.static(path.join(__dirname, "public/uploads/default_images/"))
);

//

//

//

//

//Routing setup
app.get("/", (req, res) => res.send("SERVER RUNNING.............."));
app.use("/books", books);
app.use("/users", users);
app.use("/wishlists", wishlists);
app.use("/reviews", reviews);
app.use("/login", login);
app.use("/forget-password",forgetPassword)
app.use("/verify-account",verifyAccount)
app.get("/verify-Login", auth, (req, res) => {
    console.log(req.user);
    res.json({
        isLogedin: true,
        user: req.user._id,
    });
});

//

//

//

//not found error
app.use(notFoundError);
//common error handelar
app.use(errorHandelar);

app.listen(process.env.PORT, () =>
    console.log(`Yellow Pages listening on port ${process.env.PORT}!`)
);
