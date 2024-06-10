
export const getOrder = (price) => {
    console.log(price);
    return fetch(`http://localhost:4000/api/pay/createorder/${price}`, {
        method: "GET"
    }).then(response => response.json()).catch((err) => 
     console.log(err))
}
export const grabStatus = (paymentId) => {
    // console.log(paymentId)
    return fetch(`http://localhost:4000/api/pay/payments/${paymentId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}
