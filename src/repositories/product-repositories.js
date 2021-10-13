
const Product = require('../models/Product');


exports.get = async () => {
    const res = await Product.find({ active: true }, 'title price slug');
    return res;
}

exports.getById = async (id) => {
    const res = await Product.findById(id);
    return res;
}

exports.getByTag = async (tag) => {

    const res = await Product.find({
        tags: req.params.tag,
        active: true
    }, 'title description price slug');

    return res;

}

exports.create = async (data) => {
    var product = new Product(data);
    const res = await product.save();
    return res;
}

exports.update = async (id, data) => {
    const res = await Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price,
            slug: data.slug
        }
    });
    return res;
}

exports.delete = async (id) => {
    const res = await Product.findByIdAndRemove(id);
    return res;
}

