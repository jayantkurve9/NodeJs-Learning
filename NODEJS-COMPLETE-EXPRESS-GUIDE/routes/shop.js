const express = require('express');
const path = require('path');
const rootDir = require('../utils/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
	const products = adminData.products;
	const templateData = {
		prods: products,
		docTitle: 'Shop',
		path: '/',
		hasProducts: products.length > 0,
		activeShop: true,
		productCSS: true
	}
	// the way to pass data to templates is same for all the engines but it differs in retrieval from tempating engine
	res.render('shop', templateData);
	// res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;