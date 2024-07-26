const express = require('express');
const rootDir = require('../utils/path');
const path = require('path');

const router = express.Router();

router.get('/', (req,res) => {
	res.sendFile(getFilePath('index.html'));
});

router.get('/users', (req,res) => {
	res.sendFile(getFilePath('users.html'));
});

function getFilePath(fileName) {
	return path.join(rootDir, 'views', fileName);
}

module.exports = router;