import mongoose from 'mongoose';

const positionSchema = new mongoose.Schema({
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