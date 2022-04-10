/**
 * Support for querying the Positions API
 */
import axios from 'axios';

//will get all positions based on whiteboard id (whiteboard_id is a field in each position set along with id, positionX, positionY that is meant to be shared amongst other position sets)
export default async function getWhiteboard(whiteboard_id){
    try{
        const res = await axios.get(`http://localhost:8000/api/cards/${whiteboard_id}`);
        return res.data;
      }catch(err){
          console.log(err);
      }
}

/** Positions */

export async function getPosition(whiteboard_id, id){
    try{
        const res = await axios.get(`http://localhost:8000/api/cards/${whiteboard_id}/${id}`);
        return {
            x: res.data.positionX, 
            y: res.data.positionY
        }
    }catch(err){
        console.log(err)
    }
}

export async function createPosition(whiteboard_id, id, x, y){
    try{
        const res = await axios.post(`http://localhost:8000/api/cards/${whiteboard_id}/${id}`, { positionX: x, positionY: y });
        return res.data;
    }catch(err){
        console.log(err);
    }
}

export async function updatePosition(whiteboard_id, id, x, y){
    try{
        const res = await axios.patch(`http://localhost:8000/api/cards/${whiteboard_id}/${id}`, { positionX: x, positionY: y });
        return res.data;
    }catch(err){
        console.log(err);
    }
}

export async function deletePosition(whiteboard_id, id){
    try{
        const res = await axios.delete(`http://localhost:8000/api/cards/${whiteboard_id}/${id}`);
        return res.data;
    }catch(err){
        console.log(err);
    }
}

/** Titles & Descriptions */

export async function createTitle(whiteboard_id, id, title){
    try{
        const res = await axios.post(`http://localhost:8000/api/cards/${whiteboard_id}/${id}`, { title: title });
        return res.data;
    }catch(err){
        console.log(err);
    }
}

export async function createDesc(whiteboard_id, id, desc){
    try{
        const res = await axios.post(`http://localhost:8000/api/cards/${whiteboard_id}/${id}`, { desc: desc });
        return res.data;
    }catch(err){
        console.log(err);
    }
}

export async function updateTitle(whiteboard_id, id, title){
    try{
        const res = await axios.patch(`http://localhost:8000/api/cards/${whiteboard_id}/${id}`, { title: title });
        return res.data;
    }catch(err){
        console.log(err);
    }
}

export async function updateDesc(whiteboard_id, id, desc){
    try{
        const res = await axios.patch(`http://localhost:8000/api/cards/${whiteboard_id}/${id}`, { desc: desc });
        return res.data;
    }catch(err){
        console.log(err);
    }
}