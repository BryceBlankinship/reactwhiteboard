import express from 'express';
const router = express.Router()
export default router;

import Card from './cardSchema.js';

router.get('/', async (req, res) => {
    res.json({ message: "Welcome to the ReactWhiteboard Cards API. Refer to the documentation here: https://www.reactwhiteboard.com/api/" });
});

//Get all cards within a Whiteboard
router.get('/:whiteboard_id', async (req, res) => {
    try{
        const whiteboard = await Card.find({ whiteboard_id: req.params.whiteboard_id });
        res.json(whiteboard);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
});

router.get('/:whiteboard_id/:id', getCard, (req, res) => {
    res.status(200).json(res.card);
});

router.post('/:whiteboard_id/:id', async (req, res) => {
    Card.find({ id: req.params.id }, async (err, results) => {
        if(results.length){
            res.status(400).json({ message: 'Cannot POST a new card when one is already at id ' + req.params.id });
        }else{
            const card = new Card({
                whiteboard_id: req.params.whiteboard_id,
                whiteboard_name: req.body.whiteboard_name,
                id: req.params.id,
                positionX: req.body.positionX,
                positionY: req.body.positionY,
                title: req.body.title,
                desc: req.body.desc
            });
            try {
                const newCard = await card.save();
                res.status(201).json(newCard);
            }catch(err){
                res.status(400).json({ message: err.message });
            }
        }
    });
});

router.patch('/:whiteboard_id/:id', getCard, async (req, res) => {
    try {
        // res.card.save() saves null values as well
        const updatedCard = await Card.updateOne({whiteboard_id: req.params.whiteboard_id, id: req.params.id}, req.body, {new: true});
        //const updatedCard = await res.card.save();
        res.json(updatedCard);
    } catch (err){
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:whiteboard_id/:id', getCard, async (req, res) => {
    try {
        await res.card.remove(req.params.id);
        res.json({ message: 'Deleted card ' + req.params.id + ' from whiteboard ' + req.params.whiteboard_id});
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
        whiteboard = await Card.find({ whiteboard_id: req.params.whiteboard_id });
        if(whiteboard === null){
            return res.status(404).json({ message: 'Whiteboard did not exist in database.' });
        }
    }catch(err){
        return res.status(500).json({ message: err.message });
    }

    res.whiteboard = whiteboard;
    next();
}

async function getCard(req, res, next) {
    let card;
    try{
        card = await Card.findOne({ whiteboard_id: req.params.whiteboard_id, id: req.params.id })
        if(card === null){
            return res.status(404).json({ message: 'Card did not exist in database.' });
        }
    }catch(err){
        return res.status(500).json({ message: err.message });
    }

    res.card = card;
    next();
}