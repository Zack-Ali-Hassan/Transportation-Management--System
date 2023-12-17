import mongoose from "mongoose";

const vehicleSchema =mongoose.Schema({
    vehicle_number : {
        type : String
    },
    type : {
        type : String
    },
    fual_type : {
        type : String
    },
    capacity : {
        type : String
    },
    location : {
        type : String
    },
    status : {
        type : String
    },
},
{
    timestamps: true
})

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;