require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieSession = require('cookie-session')
const passport = require("./Passport");
const path = require("path");


const app = express();


app.use(cors({
  credentials: true,
  origin: "https://accountszn.herokuapp.com/"

}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  name: 'session',
  keys: ['key1']
}))
app.use(passport.initialize());
app.use(passport.session());


const PORT = process.env.PORT || 8080
const uri = process.env.MONGO_PASS
mongoose.connect(`mongodb+srv://admin-saad:remote020@zn-fashions-accounts-app-uqxtm.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const transactionsRouter = require("./routes/transactions");
const fieldsRouter = require("./routes/fields");
const userRouter = require("./routes/user");
app.use('/transactions', transactionsRouter);
app.use('/fields', fieldsRouter);
app.use("/user", userRouter);

/*Serves the build folder that we had created */
if (process.env.NODE_ENV === "production") {
  app.use(express.static("accounts-frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "accounts-frontend", "build", "index.html"))
  })
}


app.listen(PORT, () => {
  console.log(`server has started successfully on ${PORT}`);
});