const express = require("express");
const router = express.Router();
const pizzaModel = require("../models/pizzaModel");

router.get("/getallpizzas", pizzaModel.getAllPizzas);
router.post("/addpizza", pizzaModel.addpizzas);

router.post("/getpizzabyid", pizzaModel.getpizzaByid);

router.post("/editpizza", pizzaModel.editpizza);

router.post("/deletepizza", pizzaModel.deletepizza);
//
module.exports = router;
