const Product = require("../models/product");
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

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
    const product = new Product(
        title,
        price,
        description,
        imageUrl,
        null,
        req.user._id
    );
    product
        .save()
        .then((result) => {
            console.log("Product created!");
            res.redirect("/admin/products");
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postEditProduct = (req, res, next) => {
    const { productId, title, imageUrl, price, description } = req.body;

    const product = new Product(title, price, description, imageUrl, productId);
    product
        .save()
        .then((result) => {
            res.redirect("/admin/products");
        })
        .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId)
        .then(() => {
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
    Product.findById(prodId)
        .then((product) => {
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
    Product.fetchAll()
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
