/**
 * Support for querying the Positions API
 */
import axios from 'axios';

//will get all positions based on whiteboard id (whiteboard_id is a field in each position set along with id, positionX, positionY that is meant to be shared amongst other position sets)
export default function getWhiteboard(whiteboard_id){
    axios.get(`http://localhost:8000/api/positions/${whiteboard_id}`).then(res => {
        return res.data;
      }).catch(error => console.log(error));
}

export async function getPosition(whiteboard_id, id){
    try{
        const res = await axios.get(`http://localhost:8000/api/positions/${whiteboard_id}/${id}`);
        let positions = {
            x: res.data.positionX, 
            y: res.data.positionY
        }
        return positions;
    }catch(err){
        console.log(err)
    }
}

export function createPosition(whiteboard_id, id, x, y){
    axios.post(`http://localhost:8000/api/positions/${whiteboard_id}/${id}`, { positionX: x, positionY: y }).then(res => {
        return res.data;
    }).catch(error => console.log(error));
}

export async function updatePosition(whiteboard_id, id, x, y){
    try{
        const res = await axios.patch(`http://localhost:8000/api/positions/${whiteboard_id}/${id}`, { positionX: x, positionY: y });
        return res.data;
    }catch(err){
        console.log(err);
    }
}

export async function deletePosition(whiteboard_id, id){
    try{
        const res = await axios.delete(`http://localhost:8000/api/positions/${whiteboard_id}/${id}`);
        return res.data;
    }catch(err){
        console.log(err);
    }
}