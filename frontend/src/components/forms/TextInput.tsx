
interface TextInputProps {
    label: string;
    placeholder: string;
}

function TextInput(props: TextInputProps): JSX.Element {
    return (
        <label>
            {props.label}
            <input placeholder={props.placeholder}></input>
        </label>
    );
}

export default TextInput;
export type { TextInputProps };

