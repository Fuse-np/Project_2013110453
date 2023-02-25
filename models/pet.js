const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petschema = new Schema(
    {
        name: { type: String, require: true, trim: true },
    },
    {
        toJSON: { virtuals: true },
        timestamps: true,
        collection: "pet",
    });

    petschema.virtual("pets", {
    ref: "Product",
    localField: "_id",
    foreignField: "pet",
});
const pet = mongoose.model("Pet", petschema);

module.exports = pet;