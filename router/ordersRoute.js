const express = require("express");
const router = express.Router();
const order = require("../models/orderModel");

router.post("/placeorder", order.placeorder);
router.get("/getallorders", order.allorder);
router.post("/getuserorders", order.userorder);

router.post("/deliverorder", order.deliverorder);
//
module.exports = router;
