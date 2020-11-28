const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/Student');
const mongoose = require('mongoose');
const { forwardAuthenticated } = require('../config/auth');


// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
    const { name, email, password, password2, university } = req.body;
    //const name = req.body.name;
    //const email = req.body.email;
    //const password = req.body.password;
    //const password2 = req.body.password2;
    console.log("Body:" + JSON.stringify(req.body));
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2,
            university
        });
    } else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                console.log("Errors:" + JSON.stringify(errors))
                res.json(errors);
            } else {
                const newUser = new User({
                    name,
                    email,
                    password,
                    university
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                console.log("Response:" + JSON.stringify(user))
                                res.json(user);
                            })
                            .catch(err => {
                                console.log("Errors:" + JSON.stringify(err));
                                res.json(err);
                            });
                    });
                });
            }
        });
    }
});

// Login
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.json(user);
        });
    })(req, res, next);
});

// Login
router.put('/update', (req, res, next) => {
    const user = {
        _id: mongoose.Types.ObjectId(req.body._id),

    };
    console.log("Body:" + JSON.stringify(req.body))


    User.findOneAndUpdate(user, req.body, {new: true}, (err,doc) => {
        if (err) {
            console.log("Errors:" + JSON.stringify(err))
            res.json(err)
        }
        console.log("Response:" + JSON.stringify(doc))
        res.json(doc)
    });

});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.json({message:"logged out"});
});



router.get("/find", (req,res) => {
    console.log("Parameters:"+ JSON.stringify(req.query))
    User.findById(req.query._id, "name image _id", {lean: true}, (err,user) => {
        if(err){
            console.log("Errors:" + JSON.stringify(err));
            res.json(err);
        }
        else{
            console.log("Response:" + JSON.stringify(user))
            res.json(user)
        }
    })
});

router.put("/followClub", (req,res) => {
    let student = req.body.student;
    student.clubsFollowed.push(mongoose.Types.ObjectId(req.body.clubId));
    console.log("Body:" + JSON.stringify(req.body));

    User.findOneAndUpdate({_id: mongoose.Types.ObjectId(student._id)}, student, {new:true}, (err,result)=>{
        if(err){
            console.log("Errors:" + JSON.stringify(err));
            res.json(err);
        }
        else{
            console.log("Response:" + JSON.stringify(result))
            res.json(result)
        }
    })
});

module.exports = router;