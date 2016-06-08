var mongoose = require("mongoose");
var config = require("config.json")("./config.json");
var Schema = mongoose.Schema;

mongoose.connect('mongodb://' + config.mongodb.host);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connected to mongodb");
});

var companySchema = new Schema({
    name: {type: String, required: true},
    annual: {type: Number, required: true},
    parent_id: {type: String},
    created: { type: Date, default: Date.now }
});

var Company = mongoose.model('Company', companySchema);

module.exports = Company;