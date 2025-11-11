import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
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


userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}


userSchema.methods.comparepassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


const userModel = mongoose.models.user || mongoose.model("user", userSchema)
export default userModel