import { useState } from "react";
import {
    DragDropContext,
    Draggable,
    DraggableStateSnapshot,
    DraggingStyle,
    Droppable,
    DropResult,
    NotDraggingStyle
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import InitialData from "./InitialData";
import OptionInput, { CreateOptionInputComponent } from "./Inputs/OptionInput";
import TextInput, { createTextInputComponent } from "./Inputs/TextInput";

interface componentInterface {
    id: string;
    type: string;
    props: object;
}

function FormCreator(): JSX.Element {
    const ITEMS = [
        {
            content: "Text input",
            type: "TextInput",
        },
        {
            content: "Option input",
            type: "OptionInput",
        },
    ];

    const [state, setState] = useState(InitialData);

    function getComponent(componentType: string, props: any) {
        if (componentType === "TextInput") {
            return <TextInput {...props} />;
        }
        if (componentType === "OptionInput") {
            return <OptionInput {...props} />;
        }
        return <></>;
    }

    function getStyle(style: DraggingStyle | NotDraggingStyle | undefined, snapshot: DraggableStateSnapshot) {
        if (!snapshot.isDropAnimating) {
            return style;
        }
        return {
            ...style,
            // cannot be 0, but make it super tiny
            transitionDuration: `0.01s`,
        };
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

        if (source.droppableId === "ITEMS") {
            const column =
                state.columns[
                    destination.droppableId as keyof typeof state.columns
                ];

            let newComponent: componentInterface;
            switch (draggableId) {
                case "TextInput":
                    newComponent = createTextInputComponent(uuidv4());
                    break;
                case "OptionInput":
                    newComponent = CreateOptionInputComponent(uuidv4());
                    break;
                default:
                    return;
            }

            const newComponentIds = Array.from(column.componentsIds);
            newComponentIds.splice(destination.index, 0, newComponent.id);

            const newColumn = {
                ...column,
                componentsIds: newComponentIds,
            };

            const newState = {
                ...state,
                components: {
                    ...state.components,
                    [newComponent.id]: newComponent,
                },
                columns: {
                    ...state.columns,
                    [newColumn.id]: newColumn,
                },
            };

            setState(newState);
        } else {
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
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="text-left flex">
                <div className="flex-grow">
                    <h1>Create form</h1>
                    <form className="w-full">
                        <Droppable droppableId="form">
                            {(provided) => (
                                <>
                                    <div
                                        ref={provided.innerRef}
                                        className="flex-col"
                                    >
                                        <>
                                            {state.columns.form.componentsIds.map(
                                                (componentId, index) => {
                                                    let component =
                                                        state.components[
                                                            componentId
                                                        ];
                                                    return (
                                                        <Draggable
                                                            draggableId={
                                                                component.id
                                                            }
                                                            index={index}
                                                            key={component.id}
                                                        >
                                                            {(provided) => (
                                                                <div
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    ref={
                                                                        provided.innerRef
                                                                    }
                                                                    className="component-container"
                                                                >
                                                                    {getComponent(
                                                                        component.type,
                                                                        component.props
                                                                    )}
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    );
                                                }
                                            )}
                                            {provided.placeholder}
                                        </>
                                    </div>
                                </>
                            )}
                        </Droppable>
                    </form>
                </div>
                <Droppable isDropDisabled={true} droppableId="ITEMS">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            className="text-center px-10"
                        >
                            <h2 className="">Przybornik</h2>
                            {ITEMS.map((item, index) => (
                                <Draggable
                                    key={item.type}
                                    draggableId={item.type}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <>
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getStyle(
                                                    provided.draggableProps
                                                        .style,
                                                    snapshot
                                                )}
                                                className={`py-1 px-3 border border-dashed border-gray-500 m-2 ${snapshot.isDragging ? "" : "no-dragging-animation"}`}
                                            >
                                                {item.content}
                                            </div>
                                            {snapshot.isDragging && (
                                                <div className="py-1 px-3 border border-dashed border-gray-500 m-2">
                                                    {item.content}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
}

export default FormCreator;
