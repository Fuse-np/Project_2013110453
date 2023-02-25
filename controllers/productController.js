const Product = require('../models/product')
const Pet = require('../models/pet');
const product = require('../models/product');

// pet // 
//get pet
exports.pet = async (req, res, next) => {
    const pet = await Pet.find();
    res.status(200).json({
        pet: pet,
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
        message: "Add Pet successfully",
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

// Product //
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
            message: "Product added successfully",
        });
    } catch (error) {
        next(error);
    }
};

exports.Product = async (req, res, next) => {
    const { id } = req.params;
    const pet = await Pet.findById(id);
    const product = await Product.find();
    if (!pet) {
        res.status(200).json({
            message: "Data not found",
        });
    }
    res.status(200).json({
        products: product,
    });
};

//update
exports.update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { pets, type, color, price, size ,productstatus } = req.body;
      const product = await Product.updateOne({ _id: id }, { pets, type, color, price, size ,productstatus })
      if (product.matchedCount === 0) {
        const error = new Error('Product not found')
        error.statusCode = 404
        throw error
      } 
      res.status(200).json({ message: 'Product updated successfully' })
    } catch (err) {
      next(err)
    }
  }

//Show by ID
   exports.show = async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id)
      if (!product) {
        const error = new Error('Product not found')
        error.statusCode = 404
        throw error
      }
      res.send({ data: product })
    } catch (err) {
      next(err)
    }
  }

//show all
  exports.showall = async (req, res, next) => {
    const product = await Product.find()
    res.status(200).json({
        product: product
    })
}
  
//delete
exports.destroy = async (req, res) => {
    try {
      const { id } = req.params
      const product = await Product.deleteOne({ _id: id })
      console.log(product)
      if (product.deletedCount === 0) {
        const error = new Error('Product not found')
        error.statusCode = 404
        throw error
      } 
      res.status(200).json({ message: 'Product deleted successfully' })
    } catch (err) {
      res.status(404).json({ message: 'error : ' + err.message })
    }
  }


