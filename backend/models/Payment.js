const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    _id:{
        type:String,
        require:true,
    },
    orders:{
        type:Array,
        default:[]
    },
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    contact:{
        type:String,
        require:true
    },
    isSuccess:{
        type:Boolean,
        default:false
    },
    address:{
        type:Object,
        require:true
    }
})

module.exports = mongoose.model("Order",orderSchema);