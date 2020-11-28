const express = require('express');
const router = express.Router();
const Club = require('../models/Club');
const mongoose = require('mongoose');

router.post('/newClub', (req,res)=>{
    const club = new Club(req.body);
    console.log("Body:" + JSON.stringify(req.body))
    club.save().then( newClub =>{
        console.log("Response:" + JSON.stringify(newClub))
        res.send(newClub);
    })
        .catch(err => {
            console.log("Errors:" + JSON.stringify(err))
            res.json(err)
        });
});

router.put('/update', (req, res) => {
    const club = {
        _id: mongoose.Types.ObjectId(req.body._id),
    };

    console.log("Body:" + JSON.stringify(req.body))

    const newClub = req.body;
    Club.findOneAndUpdate(club, newClub, {new: true}, (err,result)=>{
        if (err){
            console.log("Errors:" +JSON.stringify( err));
            res.json(err)
        }
        else{
            console.log("Response:" +JSON.stringify(result));
            res.json(result)
        }
    });


});

router.get('/', (req,res)=>{
    const club = {_id: mongoose.Types.ObjectId(req.query._id)};
    console.log("Parameters:" + JSON.stringify(req.query))

    Club.findOne(club, (err,result)=>{
        if (err){
            console.log("Errors:" + JSON.stringify(err))
            res.json(err)
        }
        else{
            console.log("Response:" + JSON.stringify(result))
            res.json(result)
        }
    } )

});

router.get('/:university', (req,res)=>{
    console.log("Parameters:" + JSON.stringify(req.params))
    Club.find(req.params, (err,result)=>{
        if (err){
            console.log("Errors:" + JSON.stringify(err))
            res.json(err)
        }
        else{
            console.log("Response:" + JSON.stringify(result))
            res.json(result)
        }
    })
});


module.exports = router;