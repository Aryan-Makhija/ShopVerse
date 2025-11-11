import mongoose from "mongoose";

const AdminSessionSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
        required: true

    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 * 24 * 7
    }
})




const AdminSessionModel = mongoose.models.AdminSession || mongoose.model("AdminSession", AdminSessionSchema)


export default AdminSessionModel