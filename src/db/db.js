import mongoose from "mongoose";

// const connectionString = process.env.DB_URL
export function connectToDb() {
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log("Connected To DB Successfully")
    }).catch(err => console.log(err))
}