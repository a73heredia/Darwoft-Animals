const express = require('express');
const router = express.Router();
const errorHandler = require('../../middleware/error')
const { getAllDogs } = require('../../controllers/dogControllers/allDogs');



router.get('/:id', async (req, res) => {
    const { id } = req.params;
    let dogsTotal = await getAllDogs();

    let dogId = dogsTotal.filter(el => el.id == id);
    console.log(dogsTotal)
    dogId ?
        res.status(200).json(dogId) :
        res.status(401).json({ sucees: false, error: 'This dog dont exist' });

})

module.exports = router;