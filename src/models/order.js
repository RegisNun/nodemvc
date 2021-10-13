'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const orderSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
        trim: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'done'],
        default: 'created'
    },

    items: [{
        quantify: {
            type: Number,
            required: true,
            default: 1
        },
        price: {
            type: Number,
            required: true,
            default: 1
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }],
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    },


});

module.exports = mongoose.model('Order', orderSchema);

