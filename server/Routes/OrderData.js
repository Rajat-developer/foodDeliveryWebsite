const express = require("express");
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    try {
        if (!req.body.order_data) {
            return res.status(400).json({ error: "Order data is missing in the request body" });
        }

        let data = req.body.order_data;
        data.unshift({ Order_date: req.body.order_date });

        let eId = await Order.findOne({ 'email': req.body.email });
        console.log(eId);

        if (eId === null) {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
        } else {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});

router.post('/myorderData', async (req, res) => {
 try {
    let myData= await Order.findOne({'email': req.body.email})
    res.json({orderData:myData})
 } catch (error) {
    res.status(500).send("Server Error: " + error.message);
 }
})

module.exports = router;
