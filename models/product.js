const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productschema = new Schema({
    type: {type:String},
    color: {type:String},
    price: {type:Number},
    size: {type:String},
    productstatus: {type: String},
    pet_id:{ type: Schema.Types.ObjectId, ref: "pet" },
},
{
  toJSON: { virtuals: true },
  timestamps: true,
  collection: "product",
}
);


const product = mongoose.model("Product",productschema);

module.exports = product;