//==============order===================

const mongoose = require("mongoose");
const { Address } = require("../models/Address");//userinte order address
const { User } = require("../models/User");//to identify the specific user
const { Order } = require("../models/Order");  //to move that collection
const { Product } = require("../models/Product");

const placeOrder=async(req,res)=>{
    try{
        const {shippingAddress,paymentMethod}=req.body
        if(paymentMethod!="cod"){
           return res.json("pleae select cash on delivary")
        }
            // Find the logged-in user and their cart products
       const user=await User.findById(req.userId).populate("cart.product")         //user cartilee product aanu direct payment pagil vannath so cartile productilil userinte venda (select chytha)productid und so atee id aanu evade vendath
              
        if(!user){
            return res.json({message:"user not found"})
        }
        if(!user.cart || user.cart.length==0){
        return res.json({message:"your cartis empty"})
        }
           // Make sure the address belongs to this user
    if (!mongoose.Types.ObjectId.isValid(shippingAddress)) {
      return res.status(400).json({
        message: "Invalid shipping address",
      });
    }
      const address = await Address.findOne({
      _id: shippingAddress,
      user: req.userId,
    });

    if (!address) {
      return res.status(404).json({
        message: "Shipping address not found",
      });
    }

    // Convert cart items into order items            
    const orderItems = user.cart.map((item) => {    
      if (!item.product) {
        throw new Error("A cart product could not be found");
      }

      return {
        product: item.product._id,                //This stores the product ID and quantity for each cart item in orderItems.
        quantity: item.quantity,
      };
    });

    // Calculate the amount using sale price when available
    const totalPrice = user.cart.reduce((sum, item) => {
      const product = item.product;
      const price = Number(
        product.saleprice ?? product.price ?? 0
      );

      return sum + price * item.quantity;
    }, 0);


    // Decrease product stock
// Decrease product stock when placing an order
const updatedProducts = [];

for (const item of user.cart) {
  const productId = item.product._id;
  const quantity = Number(item.quantity);

  if (!Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({
      message: "Invalid product quantity",
    });
  }

  const updatedProduct = await Product.findOneAndUpdate(
    {
      _id: productId,
      stock: { $gte: quantity },
    },
    {
      $inc: { stock: -quantity },
    },
    {
      new: true,
    }
  );

  if (!updatedProduct) {
    // Restore stock already deducted during this order attempt
    for (const previous of updatedProducts) {
      await Product.findByIdAndUpdate(previous.productId, {
        $inc: { stock: previous.quantity },
      });
    }

    return res.status(400).json({
      message: `Insufficient stock for ${item.product.name}`,
    });
  }

  updatedProducts.push({
    productId,
    quantity,
  });
}
    // Create the COD order
    const order = await Order.create({
      user: user._id,
      orderItems,
      shippingAddress: address._id,
      paymentMethod: "cod",
      paymentStatus: "Pending",
      deliveryStatus: "Pending",
      totalPrice,
      balanceTotal: totalPrice,
    });

    // Clear cart after the order is created
    user.cart = [];
    user.cart_total = 0;
    await user.save();

    return res.status(201).json({
      message: "Order placed successfully with Cash on Delivery",
      order,
    });
  } catch (error) {
    console.error("Place order error:", error);

    return res.status(500).json({
      message: error.message || "Failed to place order",
    });
  }


  
};

const fetchorderdata = async (req, res) => {
  try {
    const data = await Order.find({
      user: req.userId,
    })
      .populate("orderItems.product")
      .populate("shippingAddress")
      .sort({ createdAt: -1 });

    return res.status(200).json({ data });
  } catch (error) {
    console.error("Fetch order error:", error);

    return res.status(500).json({
      message: error.message || "Failed to fetch orders",
    });
  }
};



const takecustomerdetails = async (req, res) => {
  try {
    // Fetch all orders with customer, product, and address details
    const data = await Order.find()
      .populate("user", "name email phone")
      .populate("orderItems.product")
      .populate("shippingAddress")
      .sort({ createdAt: -1 });

    if (!data || data.length === 0) {
      return res.status(200).json({
        message: "No orders found",
        data: [],
      });
    }

    return res.status(200).json({
      message: "Customer order details fetched successfully",
      data: data,
    });
  } catch (error) {
    console.error("Customer details error:", error);

    return res.status(500).json({
      message: "Failed to fetch customer details",
      error: error.message,
    });
  }
};

const takeshowdetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid order ID",
      });
    }

    const order = await Order.findById(id)
      .populate("user", "name email phone")
      .populate("orderItems.product")
      .populate("shippingAddress")
      .lean();

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error("Show order details error:", error);

    return res.status(500).json({
      message: "Failed to fetch order details",
    });
  }
};

const updateDeliveryStatus=async(req,res)=>{
  try {
    const { id } = req.params;
    const { deliveryStatus } = req.body;

    const allowedStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Returned",
      "Failed Delivery",
      "Cancelled",
    ];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid order ID",
      });
    }

    if (!allowedStatuses.includes(deliveryStatus)) {
      return res.status(400).json({
        message: "Invalid delivery status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { deliveryStatus },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Delivery status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update delivery status error:", error);

    return res.status(500).json({
      message: "Failed to update delivery status",
    });
  }
};
//==================23=============cancel ordered product
const conformcancel = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find the order belonging to the logged-in user
    const order = await Order.findOne({
      _id: id,
      user: req.userId,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // 2. Prevent duplicate stock restoration
    if (
      order.deliveryStatus === "Cancelled" ||
      order.deliveryStatus === "Returned" ||
      order.isReturned === true
    ) {
      return res.status(400).json({
        message: "This order is already cancelled or returned",
      });
    }

    // 3. Delivered orders must use the return process
    if (order.deliveryStatus === "Delivered") {
      return res.status(400).json({
        message: "Delivered orders cannot be cancelled. Please request a return.",
      });
    }

    // 4. Restore stock for every product in the order
    for (const item of order.orderItems) {
      const updatedProduct = await Product.findByIdAndUpdate(
        item.product,
        {
          $inc: { stock: item.quantity },
        },
        { new: true }
      );

      if (!updatedProduct) {
        throw new Error(
          `Product not found: ${item.product}`
        );
      }
    }

    // 5. Update order status instead of deleting the order
    order.deliveryStatus = "Cancelled";
    await order.save();

    return res.status(200).json({
      message: "Order cancelled and stock restored successfully",
      order,
    });
  } catch (error) {
    console.error("Cancel order error:", error);

    return res.status(500).json({
      message: error.message || "Failed to cancel order",
    });
  }
};
//take order cancel details

const ordercanceldetails = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Requested Order ID:", id);
    console.log("Logged-in User ID:", req.userId);

    const order = await Order.findOne({
      _id: id,
      user: req.userId,
    })
      .populate("orderItems.product")
      .populate("shippingAddress");

    console.log("Fetched Order:", order);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json(order);

  } catch (error) {
    console.error("Order details error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};
//=======add=======
const requestReturn = async (req, res) => {
  try {
    const { productId, reason } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId) || !reason) {
      return res.status(400).json({
        message: "Valid product ID and return reason are required",
      });
    }

    const validReasons = [
      "Damaged Product",
      "Wrong Item Received",
      "Defective Product",
      "Item Not as Described",
      "Size/Color Mismatch",
      "Other",
    ];

    if (!validReasons.includes(reason)) {
      return res.status(400).json({
        message: "Invalid return reason",
      });
    }

    const order = await Order.findOne({
      user: req.userId,
      "orderItems.product": productId,
      deliveryStatus: "Delivered",
      isReturned: { $ne: true },
    }).populate("orderItems.product");

    if (!order) {
      return res.status(404).json({
        message: "Delivered order not found, or return already completed",
      });
    }

    const selectedItem = order.orderItems.find(
      (item) =>
        item.product &&
        item.product._id.toString() === productId
    );

    if (!selectedItem) {
      return res.status(404).json({
        message: "Product not found in this order",
      });
    }

    const returnedQuantity = Number(selectedItem.quantity);

    // Update product stock in MongoDB
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $inc: { stock: returnedQuantity } },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found in inventory",
      });
    }

    // Update order status for the admin dashboard
    order.isReturned = true;
    order.returnReason = reason;
    order.returnStatus = "Completed";
    order.returnedAt = new Date();
    order.deliveryStatus = "Returned";

    await order.save();

    return res.status(200).json({
      message: "Product returned successfully",
      orderId: order._id,
      productId,
      returnedQuantity,
      currentStock: updatedProduct.stock,
      deliveryStatus: order.deliveryStatus,
      returnStatus: order.returnStatus,
    });
  } catch (error) {
    console.error("Return error:", error);

    return res.status(500).json({
      message: error.message || "Failed to return product",
    });
  }
};

module.exports = { placeOrder,fetchorderdata,takecustomerdetails,takeshowdetails,updateDeliveryStatus,conformcancel,ordercanceldetails,requestReturn};