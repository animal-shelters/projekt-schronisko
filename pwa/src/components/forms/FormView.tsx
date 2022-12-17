import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance"
import useToken from "../../utils/useToken"
import useUser from "../../utils/useUser";
import PrimaryButton from "../PrimaryButton";
import Spinner from "../Spinner";
import { componentInterface } from "./FormCreator";
import CheckboxInput from "./Inputs/CheckboxInput";
import OptionInput from "./Inputs/OptionInput";
import RadioButtonInput from "./Inputs/RadioButtonInput";
import TextAreaInput from "./Inputs/TextAreaInput";
import TextInput from "./Inputs/TextInput";
import TextInputModal from "./modals/TextInputModal";

export default function FormView() {
    const { id } = useParams();
    const { token } = useToken();
    const {user} = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [form, setForm] = useState<Array<componentInterface>>();

    useEffect(() => {
        setIsLoading(true);
        axiosInstance.get(`form_schemes/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
            .then((response) => {
                setTitle(response.data.name);
                setForm(JSON.parse(response.data.content))
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                alert("Wystąpił nieoczekiwany błąd podczas ładowania danych");
            })
    }, []);

    function getComponent(componentType: string, props: any) {
        if (componentType === "TextInput") {
            return (
                <TextInput {...props} />
            );
        }
        if (componentType === "OptionInput") {
            return <OptionInput {...props} />;
        }
        if (componentType === "RadioButtonInput") {
            return <RadioButtonInput {...props} />;
        }
        if (componentType === "CheckboxInput") {
            return <CheckboxInput {...props} />;
        }
        if (componentType === "TextAreaInput") {
            return <TextAreaInput {...props} />;
        }
        return <></>;
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        const content: Record<string, any> = [];
        if (form) {
            for (let i = 0; i < form.length; i++){
                content.push({
                    [(form[i].id).toString()] : (e.target as any)[i].value
                });
            }
        }
        axiosInstance.post("forms", {content: JSON.stringify(content), formScheme: `/form_schemes/${id}`, user: `/users/${user.id}`}, { headers: { 'Authorization': `Bearer ${token}` } })
            .then((response) => {
                console.log(response);
            })
    }

    if (isLoading || form == undefined) {
        return <Spinner />
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
        }}>
            <h1 className="text-2xl text-center">{title}</h1>
            {form.map((element) => {
                return getComponent(element.type, element.props);
            })}
            <PrimaryButton type="submit" className="mt-2">Zapisz</PrimaryButton>
        </form>
    )
}
