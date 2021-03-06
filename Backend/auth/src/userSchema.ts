import mongoose from 'mongoose';

const user = new mongoose.Schema({
    googleId: {
        required: false,
        type: String,
    },
    githubId: {
        required: false,
        type: String,
    },
    username: {
        required: true,
        type: String,
    },
    whiteboards: {
        required: false,
        type: Array,
    }
}, { collection: 'usersCollection' });

export default mongoose.model("User", user);