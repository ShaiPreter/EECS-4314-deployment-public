const express = require('express');
const router = express.Router();
const Club = require('../models/Club');
const mongoose = require('mongoose');

router.post('/newClub', (req,res)=>{
    const club = new Club(req.body);
    console.log(req.body)
    club.save().then( newClub =>{
        console.log(newClub)
        res.send(newClub);
    })
        .catch(err => {
            console.log(err)
            res.json(err)
        });
});

router.put('/update', (req, res) => {
    const club = {
        _id: mongoose.Types.ObjectId(req.body._id),
    };

    console.log(req.body)

    const newClub = req.body;
    Club.findOneAndUpdate(club, newClub, {new: true}, (err,result)=>{
        if (err){
            console.log(err);
            res.json(err)
        }
        else{
            console.log(result);
            res.json(result)
        }
    });


});

router.get('/', (req,res)=>{
    const club = {_id: mongoose.Types.ObjectId(req.query._id)};
    console.log(req.query._id)

    Club.findOne(club, (err,result)=>{
        if (err){
            console.log(err)
            res.json(err)
        }
        else{
            console.log(err)
            res.json(result)
        }
    } )

});

router.get('/:university', (req,res)=>{
    console.log(req.params)
    Club.find(req.params, (err,result)=>{
        if (err){
            console.log(err)
            res.json(err)
        }
        else{
            console.log(result)
            res.json(result)
        }
    })
});


module.exports = router;