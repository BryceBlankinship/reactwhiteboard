import express from 'express';
const router = express.Router()
export default router;

import Position from '../schemas/positionSchema.js';

router.get('/', async (req, res) => {
    try{
        const positions = await Position.find();
        res.json(positions);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
});

//Get all positions within a Whiteboard
router.get('/:whiteboard_id', async (req, res) => {
    try{
        const whiteboard = await Position.find({ whiteboard_id: req.params.whiteboard_id });
        res.json(whiteboard);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
});

router.get('/:whiteboard_id/:id', getPosition, (req, res) => {
    res.status(200).json(res.position);
});

router.post('/:whiteboard_id/:id', async (req, res) => {
    Position.find({ id: req.params.id }, async (err, results) => {
        if(results.length){
            res.status(400).json({ message: 'Cannot POST a new position when one is already at id ' + req.params.id });
        }else{
            const position = new Position({
                whiteboard_id: req.params.whiteboard_id,
                id: req.params.id,
                positionX: req.body.positionX,
                positionY: req.body.positionY,
            });
            try {
                const newPosition = await position.save();
                res.status(201).json(newPosition);
            }catch(err){
                res.status(400).json({ message: err.message });
            }
        }
    });
});

router.patch('/:whiteboard_id/:id', getPosition, async (req, res) => {
    if(req.body.positionX !== null){
        res.position.positionX = req.body.positionX;
    }
    if(req.body.positionY !== null){
        res.position.positionY = req.body.positionY;
    }
    try {
        const updatedPosition = await res.position.save();
        res.json(updatedPosition);
    } catch (err){
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', getPosition, async (req, res) => {
    try {
        await res.position.remove(req.params.id);
        res.json({ message: 'Deleted position set.'});
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

async function getPosition(req, res, next) {
    let position;
    try{
        position = await Position.findOne({ whiteboard_id: req.params.whiteboard_id, id: req.params.id })
        if(position === null){
            return res.status(404).json({ message: 'Position did not exist in database.'});
        }
    }catch(err){
        return res.status(500).json({ message: err.message });
    }

    res.position = position;
    next();
}