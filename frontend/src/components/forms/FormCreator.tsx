import { useState } from "react";
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult
} from "react-beautiful-dnd";
import InitialData from "./InitialData";
import TextInput from "./TextInput";

function FormCreator(): JSX.Element {
    const [state, setState] = useState(InitialData);

    function getComponent(componentType: string, props: any) {
        if (componentType === "TextInput") {
            return <TextInput {...props} />;
        }
        return <></>;
    }

    function onDragEnd(result: DropResult) {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const column =
            state.columns[source.droppableId as keyof typeof state.columns];

        const newComponentIds = Array.from(column.componentsIds);
        newComponentIds.splice(source.index, 1);
        newComponentIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...column,
            componentsIds: newComponentIds,
        };

        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newColumn.id]: newColumn,
            },
        };

        setState(newState);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <h1>Create form</h1>
            <form>
                <Droppable droppableId="form">
                    {(provided) => (
                        <>
                            <div ref={provided.innerRef} className="flex-col">
                                <>
                                    {state.columns.form.componentsIds.map((componentId, index) => {
                                        let component = state.components[componentId]
                                        return (
                                            <Draggable
                                                draggableId={component.id}
                                                index={index}
                                                key={component.id}
                                            >
                                                {(provided) => (
                                                    <div
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                    >
                                                        {getComponent(
                                                            component.type,
                                                            component.props
                                                        )}
                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </>
                            </div>
                        </>
                    )}
                </Droppable>
            </form>
        </DragDropContext>
    );
}

export default FormCreator;
