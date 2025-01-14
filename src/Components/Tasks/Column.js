import React from "react";
import { getStatusFromColumnId } from "../../Pages/Board";
import DisplayTask from "./DisplayTasks";
import { Droppable, Draggable } from "react-beautiful-dnd";

export default function Column(props) {
  const { columnId, tasks, onDelete, setisModalEdited2 } = props;
  const columnTasks = tasks.filter(
    (task) => task.status === getStatusFromColumnId(columnId)
  );

  return (
    <div className="column-container">
      <br/>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="column"
            id={snapshot.isDraggingOver ? "dropping" : `${columnId}`}
          >
            <h2 style={{fontWeight: 'bold', fontSize: '1.5em', textAlign: 'center', marginBottom: '0.5em'}}>{getStatusFromColumnId(columnId)}</h2>
            {columnTasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`task-space ${
                      snapshot.isDragging ? "dragging" : ""
                    }`}
                  >
                    <DisplayTask
                      key={task.id}
                      task={task}
                      index={index}
                      onDelete={onDelete}
                      setisModalEdited2={setisModalEdited2}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
