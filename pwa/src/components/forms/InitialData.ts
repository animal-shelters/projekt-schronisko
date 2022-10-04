interface componentInterface {
    id: string,
    type: string,
    props: object;
}

interface stateInterface {
    components: Record<string, componentInterface>,
    columns: Record<string, {id: string, componentsIds: string[]}>,
    columnOrder: string[]
}


const InitialData: stateInterface = {
    components: {
        "component1": {
            id: "component1",
            type: "TextInput",
            props: {
                label: "Temporary label",
                placeholder: "",
            },
        },
        "component2": {
            id: "component2",
            type: "TextInput",
            props: {
                label: "Temporary label2",
                placeholder: ""
            },
        },
        "component3": {
            id: "component3",
            type: "TextInput",
            props: {
                label: "Temporary label3",
                placeholder: "",
            },
        },
        "component4": {
            id: "component4",
            type: "OptionInput",
            props: {
                label: "Options label",
                options: [
                    {
                        value: "option1",
                        displayText: "Option 1"
                    },
                    {
                        value: "option2",
                        displayText: "Option 2"
                    }
                ]
            }
        }
    },
    columns: {
        "form": {
            id: "form",
            componentsIds: ["component1", "component2", "component3", "component4"]
        }
    },
    columnOrder: ["form"]
};

export default InitialData;
