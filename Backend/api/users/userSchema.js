import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {collection: 'usersCollection'});

export default userSchema = mongoose.model("User", userSchema);