const express =  require("express");
const { createOrder, paymentCallBack, getLogo, getPayment, } =  require("../controllers/paymentController.js");
const paymentRouter = express.Router();

// router.route("/payment").get(GetPay);
paymentRouter.route("/createorder/:amount").get(createOrder);
// router.route("/checkout").get(checkOut);
paymentRouter.route("/payment/callback").post(paymentCallBack);
paymentRouter.route('/logo').get(getLogo);
paymentRouter.route('/payments/:paymentId').get(getPayment);
module.exports = paymentRouter;