import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
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
        required: false,
    },
    positionY: {
        type: Number,
        required: false,
    },
    title: {
        type: String,
        required: false,
        default: ''
    },
    desc: {
        type: String,
        required: false,
        default: ''
    }
}, {collection: 'positionsCollection'});

export default mongoose.model('Card', cardSchema);