const express = require('express');

const router = express.Router();

const users = [];

const userData = {
	docTitle: 'Users',
	users: users
}
router.get('/users', (req,res) => {
	res.render('users', userData);
});

router.post('/add-user', (req,res) => {
	users.push(req.body.userName);
	res.redirect('/users');
});

exports.routes = router;