/**
 * Support for querying the Positions API
 */
import axios from 'axios';

//will get all positions based on whiteboard id (whiteboard_id is a field in each position set along with id, positionX, positionY that is meant to be shared amongst other position sets)
export default function getWhiteboard(whiteboard_id){
    axios.get(`http://localhost:8000/api/positions/${whiteboard_id}`).then(res => {
        return res.data;
      }).catch(error => console.log(error))
}

export function getPosition(whiteboard_id, id){
    axios.get(`http://localhost:8000/api/positions/${whiteboard_id}/${id}`).then(res => {
        return res.data;
    }).catch(error => console.log(error));
}

export function createPosition(whiteboard_id, id, x, y){
    axios.post(`http://localhost:8000/api/positions/${whiteboard_id}/${id}`, { positionX: x, positionY: y }).then(res => {
        return res.data;
    }).catch(error => console.log(error));
}

export function updatePosition(whiteboard_id, id, x, y){
    axios.patch(`http://localhost:8000/api/positions/${whiteboard_id}/${id}`, { positionX: 50, positionY: 600}).then(res => {
        return res.data;
    }).catch(error => console.log(error));
}