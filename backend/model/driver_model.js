import mongoose from "mongoose";

const driverSchema =mongoose.Schema({
    name : {
        type : String
    },
    mobile : {
        type : String
    },
    email : {
        type : String
    },
    vehicle : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'
    },
},
{
    timestamps: true
}
)

const Driver = mongoose.model("Driver", driverSchema);

export default Driver;