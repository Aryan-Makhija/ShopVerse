import mongoose from "mongoose";
import bcrypt from "bcrypt"

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
}, { timestamps: true })

adminSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}


adminSchema.methods.comparepassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


const adminModel = mongoose.models.admin || mongoose.model("admin", adminSchema)
export default adminModel