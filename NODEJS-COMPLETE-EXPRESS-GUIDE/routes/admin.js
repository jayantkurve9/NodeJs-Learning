const express = require('express');
const path = require('path');
const rootDir = require('../utils/path');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
	const data = {
		docTitle: 'Add Product', 
		path: '/admin/add-product',
		formsCSS: true,
		productCSS: true,
		activeAddProduct: true
	};
	// res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
	res.render('add-product', data);
});

router.post('/product', (req, res, next) => {
	products.push({ title: req.body.title });
	res.redirect('/');
});

exports.routes = router;
exports.products = products;