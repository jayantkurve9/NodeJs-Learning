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
    const product = new Product(null, title, imageUrl, description, price);
    product
        .save()
        .then(() => {
            res.redirect("/");
        })
        .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    console.log("helloooo");
    const { productId, title, imageUrl, price, description } = req.body;
    const updatedProduct = new Product(
        productId,
        title,
        imageUrl,
        description,
        price
    );
    updatedProduct.save();
    res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect("/admin/products");
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit; // query params received as string
    if (!editMode) {
        return res.redirect("/");
    }
    const prodId = req.params.productId;
    Product.findById(prodId, (product) => {
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
    });
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, schema]) => {
            const templateData = {
                prods: rows,
                docTitle: "Admin Products",
                path: "/admin/products",
            };
            res.render("admin/products", templateData);
        })
        .catch((err) => console.log(err));
};
