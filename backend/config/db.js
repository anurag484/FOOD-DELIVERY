const mongoose = require("mongoose");

exports.connectDB = async () =>{
    await mongoose.connect('mongodb+srv://anuragruwali484:Anurag890@cluster0.nuge3de.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}
