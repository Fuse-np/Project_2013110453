const Product = require('../models/product')
const Pet = require('../models/pet');


//get pet
exports.pet = async (req, res, next) => {
    const pet = await Pet.find();
    res.status(200).json({
        pet: pet,
    });
};


exports.getproductOne = async (req, res, next) => {
    try {
        const { id } = req.params
        const pet = await Pet.findById(id).populate("product");
        if (!pet) {
            const error = new Error("Data not found")
            error.statusCode = 404
            throw error;
        }
        res.status(200).json({
            data: pet
        })
    } catch (error) {
        next(error);
    }
}

exports.Product = async (req, res, next) => {
    const { id } = req.params;
    const product = await product.findById(id);
    const pet = await pet.find();
    if (!pet) {
        res.status(200).json({
            message: "Data not found",
        });
    }
    res.status(200).json({
        goods: good,
    });
};

//Insert pet
exports.insertpet = async (req, res, next) => {

    const { name } = req.body;
    const pet = new Pet({
        name: name
    });
    await pet.save();

    res.status(200).json({
        message: "Add Data Already",
    });
};

//insert product
exports.insert = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { type, color, price, size ,productstatus } = req.body;
        
        const pet = await Pet.findById(id);
        if (!pet) {
            const error = new Error("Data not found")
            error.statusCode = 404
            throw error;
        }
        const product = new Product({
            type: type,
            color: color,
            price: price,
            size: size,
            productstatus: productstatus,
            pet: id

        });
        await product.save();
        res.status(200).json({
            message: "Add Data Already",
        });
    } catch (error) {
        next(error);
    }
};

//delete
exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const pet = await Pet.deleteOne({ _id: id });
        
        if (pet.deletedCount === 0) {
            const error = new Error("Can't found data");
            error.statusCode = 400;
            throw error;
        } else {
            res.status(200).json({
                message: "Delete Already!!"
            });
        }
    } catch (error) {
        next(error);
    }
};

//update
exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { pets, type, color, price, size ,productstatus } = req.body;
        const pet = await Pet.findOne({ _id: id });
        if (!pet) {
            const error = new Error("Can't update");
            error.statusCode = 200;
            throw error;
        } else {
            pet.type = type;
            pet.color = color;
            pet.price = price;
            pet.size = size;
            pet.productstatus = productstatus;
            pet.pet = pets;

            await pet.save();
            res.status(200).json({
                maessge: "Update data already!!",
            });
        }
    } catch (error) {
        next(error);
    }
};

