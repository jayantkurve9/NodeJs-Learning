const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    const data = {
        docTitle: "Add Product",
        path: "/admin/add-product",
        editing: false,
        isAuthenticated: req.session.isLoggedIn,
    };
    res.render("admin/edit-product", data);
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product({
        title: title,
        imageUrl: imageUrl,
        description: description,
        price: price,
        userId: req.user, // here we can store entire user object and mongoose will pick the id and store for userId
    });
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

    Product.findById(productId)
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
    Product.findByIdAndDelete(prodId)
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
                isAuthenticated: req.session.isLoggedIn,
            };
            res.render("admin/edit-product", data);
        })
        .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
    Product.find()
        // .select("title price -_id") // specify which data to fetch '-' will exclude that field
        // .populate("userId", "name") // we can do same here by passing second argument
        .then((products) => {
            const templateData = {
                prods: products,
                docTitle: "Admin Products",
                path: "/admin/products",
                isAuthenticated: req.session.isLoggedIn,
            };
            res.render("admin/products", templateData);
        })
        .catch((err) => console.log(err));
};
