const express = require('express');
const router = express.Router();
const Club = require('../models/Club');
const mongoose = require('mongoose');

router.post('/newClub', (req,res)=>{
    const club = new Club(req.body);
    club.save().then( newClub =>{
        res.send(newClub);
    })
        .catch(err => res.json(err));
});

router.put('/update', (req, res) => {
    const club = {
        _id: mongoose.Types.ObjectId(req.body._id),
    };

    const newClub = req.body;
    Club.findOneAndUpdate(club, newClub, {new: true}, (err,result)=>{
        if (err){
            res.json(err)
        }
        else{
            res.json(result)
        }
    });


});

router.get('/', (req,res)=>{
    const club = {_id: mongoose.Types.ObjectId(req.query._id)};


    Club.findOne(club, (err,result)=>{
        if (err){
            res.json(err)
        }
        else{
            res.json(result)
        }
    } )

});

router.get('/:university', (req,res)=>{
    Club.find(req.params, (err,result)=>{
        if (err){
            res.json(err)
        }
        else{
            res.json(result)
        }
    })
});


module.exports = router;