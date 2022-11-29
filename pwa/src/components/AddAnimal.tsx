import { Field, Form, Formik } from "formik";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import useToken from "../utils/useToken";
import PrimaryButton from "./PrimaryButton";
import UploadComponent from "./UploadImage";
import { urlToFile } from "../utils/imgUtils";

function AddAnimal() {
    const { token } = useToken();
    const [pictures, setPictures] = useState<Array<any>>([]);

    function handleChange(files: Array<any>) {
        const picturesTemp = pictures;

        setPictures(files)
    };

    async function handleSubmit(data: any) {
        axiosInstance.post("animals", data, { headers: { 'Authorization': `Bearer ${token}` } })
            .then((response) => {
                console.log(response)

                pictures.map((picture, index) => {
                    urlToFile(picture, index.toString())
                        .then((file) => {
                            console.log('plik2')
                            console.log(file);
                            axiosInstance.post("media_objects", { file: file, domain: `animal/${response.data.id}` }, { headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "multipart/form-data" } })
                                .then((response) => console.log(response));
                        });

                })
            })
            .catch((error) => {
                console.log(error);
                alert("Coś poszło nie tak. Spróbuj ponownie.");
                return;
            });
    }

    return (
        <div>
            Dodaj Zwierzę
            <UploadComponent maxFileSize={5000000} imgExtension={[".jpg", ".png"]} handleChange={handleChange} />
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
