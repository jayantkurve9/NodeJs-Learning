const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, schema]) => {
            const templateData = {
                prods: rows,
                docTitle: "All Products",
                path: "/products",
            };
            // the way to pass data to templates is same for all the engines but it differs in retrieval from tempating engine
            res.render("shop/product-list", templateData);
            // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
        })
        .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(([product]) => {
            res.render("shop/product-detail", {
                product: product[0],
                docTitle: product.title,
                path: "/products",
            });
        })
        .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, schema]) => {
            const templateData = {
                prods: rows,
                docTitle: "Shop",
                path: "/",
            };
            res.render("shop/index", templateData);
        })
        .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
    Cart.getCart((cart) => {
        Product.fetchAll()
            .then(([rows, schema]) => {
                const cartProducts = [];
                for (product of rows) {
                    const cartProductData = cart.products.find(
                        (prod) => prod.id === product.id
                    );
                    if (cartProductData) {
                        cartProducts.push({
                            productData: product,
                            qty: cartProductData.qty,
                        });
                    }
                }
                const templateData = {
                    path: "/cart",
                    docTitle: "Your Cart",
                    products: cartProducts,
                };
                res.render("shop/cart", templateData);
            })
            .catch((err) => console.log(err));
    });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect("/");
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect("/cart");
    });
};

exports.getOrders = (req, res, next) => {
    const templateData = {
        path: "/orders",
        docTitle: "Your Orders",
    };
    res.render("shop/orders", templateData);
};

exports.getCheckout = (req, res, next) => {
    const templateData = {
        path: "/checkout",
        docTitle: "Checkout",
    };
    res.render("shop/checkout", templateData);
};
