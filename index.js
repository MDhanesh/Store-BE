const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./connect");
const pizzaRouter = require("./router/PizzaRouter");
const userRouter = require("./router/userRoute");
const orderRouter = require("./router/ordersRoute");

dotenv.config();
db();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/pizzas", pizzaRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
  console.log("hi");
  res.send("server working");
});

// app.get("/getpizzas", (req, res) => {
//   Pizza.find({}, (err, docs) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(docs);
//     }
//   });
// });

app.listen(process.env.PORT || 5000);
