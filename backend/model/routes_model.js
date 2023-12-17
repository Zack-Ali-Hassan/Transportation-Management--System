import mongoose from "mongoose";

const routesSchema =mongoose.Schema({
    source_location : {
        type : String
    },
    destination_location : {
        type : String
    },
    distance : {
        type : String
    },
    estimated_time : {
        type : String
    },
},
{
    timestamps: true
}
)

const Routes = mongoose.model("Routes", routesSchema);

export default Routes;