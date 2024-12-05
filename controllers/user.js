const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Recipe = require('../models/recipe')
const isSignedIn = require('../middleware/is-signed-in')

router.get('/', isSignedIn, async (req, res) => 
{
    const users = await User.find();
    res.render('users/index.ejs', { users, error: null });
})

router.get('/:id', isSignedIn, async (req, res) =>
{
    const user = await User.findById(req.params.id);
    const recipes = await Recipe.find({ owner: user._id }).populate('ingredients');
    res.render('users/show.ejs', { user, recipes, error: null })
})

module.exports = router