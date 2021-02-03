// instantiate our app
const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const config = require("./config/extra-config");
const compression = require("compression")

const PORT = process.env.PORT || 8000;

const app = express();

const path = require("path");
// const logger = require("morgan");
// Express settings
// ================

//allow sessions
// app.use(session({ secret: 'booty Mctootie', cookie: { maxAge: 60000 }}));
console.log("testing");
// view engine setup
app.set("views", path.join(__dirname, "views"));
// app.use(express.static(dirname + "./public"))
console.log("testing2");

//set up handlebars
const exphbs = require("express-handlebars");
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

const isAuth = require("./config/middleware/isAuthenticated");
const authCheck = require("./config/middleware/attachAuthenticationStatus");

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use(logger("dev"));


app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({ secret: config.sessionKey, resave: true, saveUninitialized: true })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(authCheck);

// "Application" refers to the index page. This is the first web page the user sees and is where you log-in. 
const application = require('./routes/application');
// "Users" is where you're supposed to register if you don't have an account.
const users = require('./routes/users');
// "Customs" refers to the actual user profile. I just called it "customs" because it refers to custom user profiles. 
const customs = require('./routes/customs');
const { dirname } = require("path");
		

		app.use('/', application);
		app.use('/users', users);
		app.use('/customs', customs);
	

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: app.get("env") === "development" ? err : {},
  });
});


app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});


