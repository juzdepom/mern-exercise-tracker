//requiring the router
const router = require('express').Router();
//requiring the model
let User = require('../models/user.model');

//the first endpoint that handles incoming http get requests on the /users url path
router.route('/').get((req, res) => {
    //mongoose method that gets a list of all the users from the mongo DB database
    //find method returns a promise
    User.find()
        //return the users that we got from the database in json format
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
})

//second endpoint handles http post requests
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({username})
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;