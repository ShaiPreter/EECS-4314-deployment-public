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


// Routes
app.use('/students',require('./routes/students'));
app.use('/clubs',require('./routes/clubs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));