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
        required: true,
    },
    positionY: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: false,
    },
    desc: {
        type: String,
        required: false
    }
}, {collection: 'positionsCollection'});

export default mongoose.model('Card', cardSchema);