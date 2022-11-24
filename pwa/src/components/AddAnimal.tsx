import { Field, Form, Formik } from "formik";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import useToken from "../utils/useToken";
import DatePickerField from "./forms/DatePickerField";
import PrimaryButton from "./PrimaryButton";
import UploadComponent from "./UploadImage";
import DatePicker from "react-datepicker";

function AddAnimal() {
    const { token } = useToken();
    const [pictures, setPictures] = useState<Array<any>>([]);

    const [startDate, setStartDate] = useState(new Date());

    function handleChange(files: Array<any>) {
        const picturesTemp = pictures;

        setPictures([...picturesTemp, pictures])
    };

    function handleSubmit(data: any) {
        console.log(data);
        axiosInstance.post("animals", data, { headers: { 'Authorization': `Bearer ${token}` } })
            .then((response) => console.log(response))
            .catch((error) => {
                console.log(error);
            });;
    }

    return (
        <div>
            Dodaj Zwierzę
            <UploadComponent maxFileSize={123456789} imgExtension={[".jpg", ".png"]} handleChange={handleChange} />
            <Formik
                initialValues={{}}
                onSubmit={(values) => handleSubmit(values)}>
                <Form className="w-full">
                    <label>
                        Gatunek
                        <br></br>
                        <Field name="species" placeholder="Gatunek zwierzęcia" />
                    </label>

                    <label>
                        Rasa
                        <br></br>
                        <Field name="breed" placeholder="Rasa zwierzęcia" />
                    </label>

                    <label>
                        Imię
                        <br></br>
                        <Field name="name" placeholder="Imię zwierzęcia" />
                    </label>

                    <label>
                        Data urodzenia
                        <br></br>
                        <Field name="birthDate" placeholder="Data urodzenia zwierzęcia" type="date" />
                    </label>

                    <label>
                        Data przyjęcia do schroniska
                        <br></br>
                        <Field name="intakeDate" placeholder="Data przycjęcia zwierzęcia do schroniska" type="date" />
                    </label>

                    <label>
                        Opis
                        <br></br>
                        <Field name="description" placeholder="Opis zwierzęcia" as="textarea" />
                    </label>
                    <PrimaryButton type="submit" className="bg-primary dark:bg-primaryDark dark:text-white">Zapisz</PrimaryButton>
                </Form>
            </Formik>
        </div>
    )
}

export default AddAnimal;
