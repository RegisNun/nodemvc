
const Order = require('../models/order');


exports.get = async () => {
    const res = await Order.find({}, 'number status custumer items')
        .populate('customer', 'name')
        .populate('items.product', 'title');
    return res;
}

exports.create = async (data) => {
    var order = new Order(data);
    const res = await order.save();
    return res;
}

exports.update = async (id, data) => {
    const res = await Order.findByIdAndUpdate(id, {
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
    const res = await Order.findByIdAndRemove(id);
    return res;
}

