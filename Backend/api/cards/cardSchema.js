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
    },
    desc: {
        type: String,
        required: false,
    },
    children: {
        type: Array,
        required: false,
    }
}, {collection: 'positionsCollection'});

export default mongoose.model('Card', cardSchema);