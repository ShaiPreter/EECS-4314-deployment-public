const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
var bodyParser = require('body-parser');

const app = express();

// Passport Config
require('./config/passport')(passport);



// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(
        db,
        { useNewUrlParser: true,
          useUnifiedTopology:true}

    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

mongoose.set('useFindAndModify', false);




// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

const rateLimit = require("express-rate-limit");

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 100 requests per windowMs
    message: 'You have exceeded the 100 requests in 24 hrs limit!',
    headers: true,
});

//  apply to all requests
app.use(limiter);


// Routes
app.use('/students',require('./routes/students'));
app.use('/clubs',require('./routes/clubs'));

const PORT = process.env.PORT || 5000;

//app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app