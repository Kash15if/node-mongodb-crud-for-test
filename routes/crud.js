const express = require("express");
const router = express.Router();
const User = require('../models/user.model');

var jwt = require("jsonwebtoken");



// Get all users
router.get('/', async (req, res) => {
    // console.log("xxx")
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one user
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});

// Create a user
router.post('/', async (req, res) => {
    const user = new User({
        id: req.body.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        ip_address: req.body.ip_address
    });


    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



// Create a multiple user
router.post('/bulkData', async (req, res) => {

    const bulkData = req.body;
    User.insertMany(bulkData).then(function () {
        console.log("Data inserted")  // Success
    }).catch(function (error) {
        console.log(error)      // Failure
        res.status(400).json({ message: err.message });
    }).then(() => {
        res.status(201).json({ totalRowsUpdated: bulkData.length });
    });

});

// Update a user
router.patch('/:id', async (req, res) => {

    let idToUpdate = req.params.id;
    let obj = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(idToUpdate, obj, { new: true })
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {

    console.log(req.params.id);

    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});



router.post('/delete-multiple', async (req, res) => {

    console.log(req.body)

    const objects = req.body;

    try {
        let result = await User.deleteMany({ _id: { $in: objects } })
        res.json(`${result.deletedCount} document(s) deleted`);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getUser(req, res, next) {
    let user;

    try {
        user = await User.findById(req.params.id);

        if (user == null) {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
}

module.exports = router;