import mongoose from "mongoose";

const maintenanceRecordSchema = mongoose.Schema(
  {
    type: {
      type: String,
    },
    description: {
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

const MaintenanceRecord = mongoose.model("MaintenanceRecord", maintenanceRecordSchema);

export default MaintenanceRecord;
