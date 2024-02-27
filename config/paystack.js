import dotenv from "dotenv";
dotenv.config();

const paystack = (request) => {
    const MySecretKey = 'Bearer sk_test_31047b00d361be56b3a70b2c686fb832d3bd700f'; // Replace 'sk_test_xxxx' with your own secret key
    const initializePayment = (form, mycallback) => {    
         //returns an authorization url or an error as the case
        const options = {
            url: 'https://api.paystack.co/transaction/initialize',
            headers: {
                authorization: MySecretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
            },
            form
        };
        const callback = (error, response, body) => {
            return mycallback(error, body);
        };
        request.post(options, callback);
    };

    const verifyPayment = (ref, mycallback) => {
        const options = {
            url: 'https://api.paystack.co/transaction/verify/' + encodeURIComponent(ref),
            headers: {
                authorization: MySecretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
            }
        };
        const callback = (error, response, body) => {
            return mycallback(error, body);
        };
        request(options, callback);
    };

    return { initializePayment, verifyPayment };
};

module.exports = paystack;
