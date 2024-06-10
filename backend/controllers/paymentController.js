const Razorpay =require ( 'razorpay');
const uniqueId = require("uniqid");
const path = require('path');
const orderSchema = require("../models/Payment.js")
const crypto = require("crypto");
const request = require('request');
let orderId;
require('dotenv').config({ path: "../.env" });
 
const instance = new Razorpay({ key_id: "rzp_test_4JmrXUoVzwPTBB", key_secret: "SxutbkMly8pRxi0c05Za5JuX" });
const GetPay = async (req, res) => {
    res.send("Hello");
};

const createOrder = async (req, res) => {
    const { amount } = req.params;
    const price = amount * 100;
    const options = {
        amount: price,  // amount in the smallest currency unit
        currency: "INR",
        receipt: uniqueId()
    };
    instance.orders.create(options, function (err, order) {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        orderId = order.id;
        res.json(order);
    });
};

const paymentCallBack = async (req, res) => {
    const { fields, user, address } = req.body;
    const hash = crypto.createHmac('sha256', "SxutbkMly8pRxi0c05Za5JuX").update(fields.razorpay_order_id + "|" + fields.razorpay_payment_id).digest('hex');
    if (fields.razorpay_signature === hash) {
        const info = {
            _id: fields.razorpay_payment_id,
            razorpay_order_id: fields.razorpay_order_id,
        }
        request(`https://rzp_test_4JmrXUoVzwPTBB:SxutbkMly8pRxi0c05Za5JuX@api.razorpay.com/v1/payments/${fields.razorpay_payment_id}`, async function (error, response, body) {
            if (body) {
                const result = JSON.parse(body);
                if (result.code === 'BAD_REQUEST_ERROR') {
                    res.status(400).json({
                        error: "Something went wrong"
                    })
                } else {
                    const order = await orderSchema.create({
                        _id: info._id,
                        orders: info.razorpay_order_id,
                        name: user.name,
                        email: user.email,
                        isSuccess: result.captured,
                        address: address
                    });
                    if(!result.captured){
                        res.status(400).json({
                            error: "Something went wrong"
                        })
                    }
                    res.status(200).json(order);
                }
            }
        })

    } else {
        res.status(400).json("Error");
    }

}

const getLogo = (req, res) => {
    res.sendFile(path.join(__dirname, 'logo192.png'));
}

const getPayment = (async (req, res) => {
    orderSchema.findById(req.params.paymentId).exec((err, data) => {
        if (err || data == null) {
            res.json({
                error: "No order found",
                massage: err
            })
        } else {
            request(`https://rzp_test_4JmrXUoVzwPTBB:${"SxutbkMly8pRxi0c05Za5JuX"}@api.razorpay.com/v1/payments/${req.params.paymentId}`, function (error, response, body) {
                if (body) {
                    const result = JSON.parse(body);
                    res.status(200).json(result);
                }
            })
        }
    })
})


module.exports =  {
    GetPay,
    createOrder,
    paymentCallBack,
    getLogo,
    getPayment
}
