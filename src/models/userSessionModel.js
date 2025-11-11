import mongoose from "mongoose";

const UserSessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
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

const userSessionModel = mongoose.models.usersessionModel || mongoose.model("usersessionModel", UserSessionSchema)
export default userSessionModel