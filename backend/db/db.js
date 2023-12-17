import mongoose from "mongoose";
import chalk from "chalk";
import { url } from "../config/config.js";

const connectDB = ()=>{
    try{
        mongoose.connect(url);
        console.log(`${chalk.green.bold("Connection successful")}`);
    }
    catch(error){
        console.log(`${chalk.red.bold("Error in connection database : ")}` + error);
    }
}

export default connectDB;