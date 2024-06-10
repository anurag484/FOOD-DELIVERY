import React, { useState, useEffect } from 'react';
import { getOrder } from '../../config/ApiCalls';

const RazorpayButton = (props) => {
    const { paymentPrice, address, isFilled } = props;
    const [user, setUser] = useState({});
    const [token, setToken] = useState('');
    const [values, setValues] = useState({
        amount: 0,
        orderId: '',
        error: '',
        success: false,
    });

    const { amount, orderId, success, error } = values;

    const getUser = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/user/me", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token"),
                },
                credentials: "include",
            });
            const data = await response.json();
            if (data.success) {
                setUser(data.user);
                createOrder();
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            getUser();
        }
    }, []);

    const createOrder = () => {
        getOrder(paymentPrice).then(response => {
            if (response.error) {
                setValues({ ...values, error: response.error, success: false });
            } else {
                setValues({
                    ...values,
                    success: true,
                    error: '',
                    orderId: response.id,
                    amount: response.amount,
                });
            }
        });
    };
 

    const loadRazorpayScript = () => {
        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = showRazorpay;
        document.body.appendChild(script);
    };

    const showRazorpay = () => {
      const options = {
          key: "rzp_test_4JmrXUoVzwPTBB",
          amount: amount,
          currency: "INR",
          name: "Food-Del",
          description: "Buy, Eat and Repeat",
          order_id: orderId,
          prefill: {
              name: user.name,
              email: user.email,
              contact: user.contact,
          },
          notes: {
              address: address,
          },
          theme: {
              color: "#ff7d24",
          },
          handler: function (response) {
              handlePaymentCallback(response);
          },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
  
      rzp.on('payment.failed', function (response) {
          console.log(response.error.code);
          console.log(response.error.description);
          console.log(response.error.source);
          console.log(response.error.step);
          console.log(response.error.reason);
          console.log(response.error.metadata.order_id);
          console.log(response.error.metadata.payment_id);
      });
  };
   
    const handlePaymentCallback = async (response) => {
        const fields = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
        };
        
        const paymentData = { fields, user, address };
        
        try {
            const res = await fetch('http://localhost:4000/api/pay/payment/callback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData)
            });
            const result = await res.json();
            if (result.error) {
                console.error(result.error);
            } else {
                console.log('Payment successful', result);
            }
        } catch (error) {
            console.error('Error in payment callback', error);
        }
    };

    return (
        <div>
            {amount === 0 && orderId === "" ? (
                <h1>Loading...</h1>
            ) : (
              <>
                <button disabled={!isFilled} onClick={()=>loadRazorpayScript()}>
                    Place Your Order
                </button>
                
              </>

            )}
        </div>
    );
};

export default RazorpayButton;
