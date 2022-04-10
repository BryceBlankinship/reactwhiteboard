
/**
 
import { initialData } from './initial-data.js';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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


*/