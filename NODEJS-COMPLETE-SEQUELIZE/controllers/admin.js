const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    const data = {
        docTitle: "Add Product",
        path: "/admin/add-product",
        editing: false,
    };
    res.render("admin/edit-product", data);
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    req.user
        .createProduct({
            // Product.create to create new product, but as we formed relationship between User and Product we can have and use sequelize createProduct method on user sequelize object to create new product
            title: title,
            price: price,
            imageUrl: imageUrl,
            description: description,
        })
        .then((result) => {
            res.redirect("/admin/products");
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postEditProduct = (req, res, next) => {
    console.log("helloooo");
    const { productId, title, imageUrl, price, description } = req.body;
    Product.findByPk(productId)
        .then((product) => {
            product.title = title;
            product.price = price;
            product.description = description;
            product.imageUrl = imageUrl;
            return product.save();
        })
        .then((result) => {
            res.redirect("/admin/products");
        })
        .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId)
        .then((product) => {
            return product.destroy();
        })
        .then((result) => {
            res.redirect("/admin/products");
        })
        .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit; // query params received as string
    if (!editMode) {
        return res.redirect("/");
    }
    const prodId = req.params.productId;
    req.user
        .getProducts({ where: { id: prodId } }) //another way of fetching products
        // Product.findByPk(prodId)
        .then((products) => {
            const product = products[0];
            if (!product) {
                return res.redirect("/");
            }
            const data = {
                docTitle: "Edit Product",
                path: "/admin/edit-product",
                editing: editMode,
                product: product,
            };
            res.render("admin/edit-product", data);
        })
        .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
    // Product.findAll()
    req.user
        .getProducts()
        .then((products) => {
            const templateData = {
                prods: products,
                docTitle: "Admin Products",
                path: "/admin/products",
            };
            res.render("admin/products", templateData);
        })
        .catch((err) => console.log(err));
};
