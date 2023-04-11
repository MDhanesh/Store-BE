const Order = require("../schema/orderModel");
const stripe = require("stripe")(
  "sk_test_51MvZM3SAPHM4BessAwPILOHY9OO6pmDLhBhLFzC1B1Ry0qCsw0FHCqjHwAtq9XzStLsWZ5Ks6XUbZK1dpJWyCwQP006Y79rr3J"
);
const { v4: uuidv4 } = require("uuid");

exports.placeorder = async (req, res) => {
  const { token, subtotal, currentUser, cartItems } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.paymentIntents.create(
      {
        amount: subtotal * 100,
        currency: "inr",
        customer: customer.id,
        payment_method_types: ["card"],
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      const neworder = new Order({
        name: currentUser.name,
        email: currentUser.email,
        userid: currentUser._id,
        orderItems: cartItems,
        orderAmount: subtotal,
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          pincode: token.card.address_zip,
        },
      });

      neworder.save();

      res.send("Order placed successfully");
    } else {
      res.send("Payment failed");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" + error });
  }
};

exports.userorder = async (req, res) => {
  const { userid } = req.body;
  try {
    const orders = await Order.find({ userid: userid }).sort({ _id: -1 });
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

exports.allorder = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

exports.deliverorder = async (req, res) => {
  const orderid = req.body.orderid;
  try {
    const order = await Order.findOne({ _id: orderid });
    order.isDelivered = true;
    await order.save();
    res.send("Order Delivered Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
