
const Customer = require('../models/customer');


exports.get = async () => {
    const res = await Customer.find({ active: true }, 'title price slug');
    return res;
}

exports.getById = async (id) => {
    const res = await Customer.findById(id);
    return res;
}


exports.create = async (data) => {
    var customer = new Customer(data);
    const res = await customer.save();
    return res;
}

exports.update = async (id, data) => {
    const res = await Customer.findByIdAndUpdate(id, {
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
    const res = await Customer.findByIdAndRemove(id);
    return res;
}


exports.authenticate = async (data) => {
    const res = await Customer.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}
