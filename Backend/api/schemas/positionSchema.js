import mongoose from 'mongoose';

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
});

const whiteboardSchema = new mongoose.Schema({
    whiteboard_id: {
        type: Number,
        required: true,
    },
    user: {
        type: userSchema,
        required: true,
    }
}, {collection: 'positionsCollection'});

const positionSchema = new mongoose.Schema({
    whiteboard_id: {
        type: Number,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
    positionX: {
        type: Number,
        required: true,
    },
    positionY: {
        type: Number,
        required: true,
    }
}, {collection: 'positionsCollection'});

export default mongoose.model('Position', positionSchema);
export const whiteboardModel = mongoose.model('Whiteboard', whiteboardSchema);