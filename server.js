const express = require("express");
const bodyParser = require('body-parser')
//const session = require('express-session')
const Model = require('./models')
const dbConnection =  Model.mongoose
//const MongoStore = require('connect-mongo')(session)
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

//IB adding for passport
const passport = require('passport');

// Sessions --> creates an empty session object, as req.session
// ib saves the session object to the database
// app.use(
// 	session({
// 		secret: 'struggling-ninja', //pick a random string to make the hash that is generated secure
// 		store: new MongoStore({ mongooseConnection: dbConnection }),
// 		resave: false, //required
// 		saveUninitialized: false //required
// 	})
// );

// Define middleware here
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize()); //ib
//app.use(passport.session()) // ib calls the deserializeUser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1/concertbud2", { useNewUrlParser: true });

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
