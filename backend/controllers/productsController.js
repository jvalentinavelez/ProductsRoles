const data = {
    products: require('../model/products.json'),
    setProducts: function (data) { this.products = data }
}

const getAllProducts = (req, res) => {
    const products = data.products;
    if (!products) return res.status(204).json({ 'message': 'No products found.' });
    res.json(products);
}

module.exports = {
    getAllProducts
}