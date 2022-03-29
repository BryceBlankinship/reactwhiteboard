import { Entity, Schema } from "redis-om";

class Position extends Entity {
    toJSON(){
        return {
            id: this.entityId,
            positionX: this.positionX,
            positionY: this.positionY
        }
    }
}

export const positionSchema = new Schema(Position, {
    id: {
        type: 'number'
    },
    positionX: {
        type: 'number'
    },
    positionY: {
        type: 'number'
    }
}, {
    dataStructure: 'JSON'
})