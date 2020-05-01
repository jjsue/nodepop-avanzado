'use strict';

const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
    name: String,
    sell: Boolean,
    price: Number,
    image: String,
    tags: [String],
    message: mongoose.Schema.Types.Mixed,
});

adSchema.statics.lista = function (filter, sort, skip, limit, fields) {
    var query = Ad.find(filter);
    query.sort(sort);
    query.skip(skip);
    query.limit(limit);
    query.select(fields);
    return query.exec();
}

const Ad = mongoose.model('ad', adSchema);

module.exports = Ad;