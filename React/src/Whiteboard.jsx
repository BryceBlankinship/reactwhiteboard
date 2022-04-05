import React, { Component } from 'react';
import Button from './Buttons.jsx';
import Card from './Cards.jsx';
import './whiteboard.css';
import { initialData } from './initial-data.js';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


let entities = []
const createEntity = (title, desc) => {
    entities.push({ title, desc });
    console.log(entities);
}

const updateEntity = (index, title, desc) => {
    entities[index] = {title, desc};
    console.log(entities)
}

const deleteEntity = (index) => {
    // this makes that index undefined, but does not affect the array's length
    delete entities[index];
    console.log(entities)
}

const refresh = () => {
    
}

export default function WhiteboardView() {

    return (
        <div className="whiteboard-page-container">
            <input className='input-whiteboardname' placeholder='My Whiteboard'></input>
            <Button type='small' title='Save'></Button>
            <Button type='small' title='Refresh' onClick={refresh}></Button>
            <br></br>
            <Whiteboard />
        </div>
    );
}

export function Whiteboard() {
    return (
        <div className="whiteboard-container">
            <p>Welcome to your Whiteboard!</p>
            <p>Begin by creating a component below or clicking <Button type='text' title='here' fontSize='15px' onClick={() => {
                createEntity('title', 'desc')
            }}></Button></p>

            <p>Update here <Button type='text' title='here' fontSize='15px' onClick={() => {
                updateEntity(2, 'newTitle', 'newDesc')
            }}></Button></p>

            <p>Delete here <Button type='text' title='here' fontSize='15px' onClick={() => {
                deleteEntity(2)
            }}></Button></p>

            <Card title='test' desc='desc'/>

            <App/>
        </div>
    );
}


const result = {
    draggableId: 'task-1',
    type: 'TYPE',
    reason: 'DROP',
    source: {
        droppableId: 'column-1',
        index: 0,
    },
    destination: {
        droppableId: 'column-1',
        index: 1,
    },
};


class App extends Component {
    state = initialData;

    onDragEnd = result => {
        const { destination, source, draggableId } = result;

        if(!destination){
            return null;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ){
            return null;
        }

        const column = this.state.columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...column,
            taskIds: newTaskIds,
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newColumn.id]: newColumn,
            },
        };

        this.setState(newState);
    };

    render(){
        return(
            <DragDropContext onDragEnd={this.onDragEnd}>
                {this.state.columnOrder.map((columnId) => {
                    const column = this.state.columns[columnId];
                    const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
        
                    return <Column key={column.id} column={column} tasks={tasks}/>
                })}
            </DragDropContext>
        );
    }
}


class Column extends Component {
    render(){
        return (
            <div className="column-container">
                <h3 className='title'>{this.props.column.title}</h3>
                <Droppable droppableId={this.props.column.id}>
                    {provided => (
                        <div className="tasklist" ref={provided.innerRef} {...provided.droppableProps}>

                            {this.props.tasks.map((task, index) => <Task key={task.id} task={task} index={index}/>)}
                            {provided.placeholder}
                        </div>
                    )}

                </Droppable>
            </div>
        );
    }
}

class Task extends Component {
    render(){
        return(
            <Draggable draggableId={this.props.task.id} index={this.props.index}>
                {(provided) => (
                    <div className="task-container" 
                    {...provided.draggableProps} 
                    ref={provided.innerRef}>
                        <div className="handle-container icon gripvertical" {...provided.dragHandleProps}></div>
                        {this.props.task.content}
                    </div>
                )}
            </Draggable>

        );
    }
}


