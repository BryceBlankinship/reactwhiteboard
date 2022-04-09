import express from 'express';
const router = express.Router()
export default router;

import Position from '../schemas/positionSchema.js';

router.get('/', async (req, res) => {
    res.json({ message: "Welcome to the ReactWhiteboard positions API. Refer to the documentation here: https://www.reactwhiteboard.com/api/" });
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
                whiteboard_name: req.body.whiteboard_name,
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

router.delete('/:whiteboard_id/:id', getPosition, async (req, res) => {
    try {
        await res.position.remove(req.params.id);
        res.json({ message: 'Deleted position ' + req.params.id + ' from whiteboard ' + req.params.whiteboard_id});
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:whiteboard_id', getWhiteboard, async (req, res) => {
    try{
        await res.whiteboard.remove(req.params.whiteboard_id);
        res.json({ message: 'Deleted whiteboard ' + req.params.whiteboard_id });
    }catch(err){
        res.status(500).json({ message: err.message });
    }
});

async function getWhiteboard(req, res, next) {
    let whiteboard;
    try{
        whiteboard = await Position.find({ whiteboard_id: req.params.whiteboard_id });
        if(whiteboard === null){
            return res.status(404).json({ message: 'Whiteboard did not exist in database.' });
        }
    }catch(err){
        return res.status(500).json({ message: err.message });
    }

    res.whiteboard = whiteboard;
    next();
}

async function getPosition(req, res, next) {
    let position;
    try{
        position = await Position.findOne({ whiteboard_id: req.params.whiteboard_id, id: req.params.id })
        if(position === null){
            return res.status(404).json({ message: 'Position did not exist in database.' });
        }
    }catch(err){
        return res.status(500).json({ message: err.message });
    }

    res.position = position;
    next();
}