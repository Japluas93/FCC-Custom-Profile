// instantiate our app
const express = require("express");
const session = require("express-session");
const passport = require("./api-server/config/passport");
const config = require("./api-server/config/extra-config");
const compression = require("compression")

const PORT = process.env.PORT || 8000;

const app = express();

const path = require("path");
// const logger = require("morgan");
// const compression = require("compression");
// Express settings
// ================

//allow sessions
// app.use(session({ secret: 'booty Mctootie', cookie: { maxAge: 60000 }}));

// view engine setup
app.set("views", path.join(__dirname, "views"));

//set up handlebars
const exphbs = require("express-handlebars");
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

const isAuth = require("./api-server/config/middleware/isAuthenticated");
const authCheck = require("./api-server/config/middleware/attachAuthenticationStatus");

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

const application = require('./api-server/routes/application');
		const users = require('./api-server/routes/users');
		const customs = require('./api-server/routes/customs');
		

		app.use('/', application);
		app.use('/users', users);
		app.use('/trips', customs);
	

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


db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

