import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import useToken from "../utils/useToken";
import PrimaryButton from "./PrimaryButton";
import UploadComponent from "./UploadImage";
import { urlToFile } from "../utils/imgUtils";
import { useLocation, useParams } from "react-router-dom";
import Animal from "../models/animal.dto";
import Spinner from "./Spinner";

interface AnimalFormSchema {
    species: string;
    breed: string;
    name: string;
    birthDate: string;
    intakeDate: string;
    description: string;
}

function AnimalForm() {
    const { id } = useParams();
    const { token } = useToken();
    const [pictures, setPictures] = useState<Array<any>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [animal, setAnimal] = useState<Animal>();
    const location = useLocation();

    useEffect(() => {
        setIsLoading(true);
        if (!location.state) {
            axiosInstance.get(`animals/${id}`)
                .then((response) => {
                    if (response.data) {
                        setAnimal(response.data);
                    }
                }).catch((error) => {
                    alert("Wystąpił nieznany błąd. Spróbuj ponownie");
                    console.error(error);
                })
        } else if (location.state) {
            setAnimal(location.state as Animal);
        }
        setIsLoading(false);
    }, [])


    function handleChange(files: Array<any>) {
        setPictures(files)
    };

    async function handleSubmit(data: any) {
        if (!animal) {
            axiosInstance.post("animals", data, { headers: { 'Authorization': `Bearer ${token}` } })
                .then((response) => {
                    pictures.map((picture, index) => {
                        urlToFile(picture, index.toString())
                            .then((file) => {
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
        } else {
            axiosInstance.put(`animals/${id}`, data, { headers: { 'Authorization': `Bearer ${token}` } })
                .catch((error) => {
                    console.log(error);
                    alert("Coś poszło nie tak. Spróbuj ponownie.");
                    return;
                })
        }
    }

    return (
        <div>
            {isLoading
                ? <Spinner />
                : animal
                    ? <>Dodaj Zwierzę
                        <UploadComponent maxFileSize={5000000} imgExtension={[".jpg", ".png"]} handleChange={handleChange} />
                        <Formik
                            initialValues={animal || {
                                species: '',
                                breed: '',
                                name: '',
                                birthDate: '',
                                intakeDate: '',
                                description: ''
                            }}
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
                    </>
                    : <h1>Nie znaleziono zwierzęcia</h1>}

        </div>
    )
}

export default AnimalForm;
