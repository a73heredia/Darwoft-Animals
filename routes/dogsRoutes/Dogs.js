const express = require('express');
const router = express.Router();
const errorHandler = require('../../middleware/error')
const { getAllDogs } = require('../../controllers/dogControllers/allDogs');

/* 
router.get('/', async (req, res) => {
    const dogs = await getAllDogs();
    console.log(dogs)
    res.send(dogs)
}) */

router.get('/', async (req, res) => {
    const name = req.query.name;
    let dogsTotal = await getAllDogs();
    if (name) {
        let dogName = await dogsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        dogName ?
            res.status(200).json(dogName) :
            res.status(404).send("This Dog doesn't exist")
    } else {
        res.send(dogsTotal)
    }
})

module.exports = router;