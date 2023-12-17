import mongoose from "mongoose";

const fuelSchema = mongoose.Schema(
  {
    type: {
      type: String,
    },
    quantity: {
      type: String,
    },
    cost: {
      type: String,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },
  },
  {
    timestamps: true,
  }
);

const Fuel = mongoose.model("Fuel", fuelSchema);

export default Fuel;
