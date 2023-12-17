import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    pickup_location: {
      type: String,
    },
    delivery_location: {
      type: String,
    },
    weight: {
      type: String,
    },
    status: {
      type: String,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
