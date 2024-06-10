const foodModel = require('../models/foodModel.js')
const fs = require('fs')


// add food item

const addFood = async (req,res) => {

    try {
    let image_filename = `${req.file.filename}`;
        console.log(image_filename);
    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
     })
        await food.save();
        res.status(201).json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Error"})
    }
}

// all food list
const listFood = async (req,res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// remove food item
const removeFood = async (req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

module.exports = {addFood,listFood,removeFood}