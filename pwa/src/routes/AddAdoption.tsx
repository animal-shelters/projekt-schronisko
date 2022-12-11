import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import User from "../models/user-type";
import Animal from "../models/animal.dto";
import axiosInstance from "../utils/axiosInstance";
import useToken from "../utils/useToken";
import { dateToInputFormat } from "../utils/dateUtils";
import { mapAdoptionToDto } from "../models/adoption.dto";

export default function AddAdoption() {
    const [isBusy, setIsBusy] = useState(false);
    const [users, setUsers] = useState<Array<User>>([]);
    const [animals, setAnimals] = useState<Array<Animal>>([]);

    const { token } = useToken();

    useEffect(() => {
        axiosInstance.get("animals")
            .then((response) => {
                setAnimals(response.data["hydra:member"]);
            })
            .catch((error) => {
                console.error(error);
                alert("Wystąpił problem podczas ładowania listy zwierząt");
            });
        axiosInstance.get("users", { headers: { 'Authorization': `Bearer ${token}` } })
            .then((response) => {
                setUsers(response.data["hydra:member"]);
            })
            .catch((error) => {
                console.error(error);
                alert("Wystąpił problem podczas ładowania listy użytkowników");
            });
    }, [])


    interface AdoptionSchema {
        user: string;
        animal: string;
        date: string;
    }

    const adoptionValidationSchema = Yup.object().shape({
        user: Yup.string()
            .required("To pole jest wymagane."),
        animal: Yup.string()
            .required("To pole jest wymagane."),
        date: Yup.date()
            .required("To pole jest wymagane."),
    });


    function handleSubmit(data: AdoptionSchema) {
        setIsBusy(true);
        console.log(mapAdoptionToDto(data));
        axiosInstance.post("adoptions", mapAdoptionToDto(data), { headers: { 'Authorization': `Bearer ${token}` } })
            .then((_) => {
                alert("Poprawnie zapisano adopcję");
                window.location.replace('/adoptions');
            }).catch((error) => {
                console.error(error);
                alert("Wystąpił problem przy zapisywaniu adopcji");
            })
        setIsBusy(false);
    }

    return (
        <Formik
            initialValues={{
                user: "",
                animal: "",
                date: dateToInputFormat(new Date()),
            }}
            validationSchema={adoptionValidationSchema}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({ errors, touched }) => (
                <Form>
                    <label htmlFor="user">Id użytkownika:</label>
                    <Field name="user" type="select" />
                    {errors.user && touched.user ? <><span>{errors.user}</span><br /></> : null}
                    <label htmlFor="animal">Id zwierzęcia:</label>
                    <Field name="animal" type="select" />
                    {errors.animal && touched.animal ? (
                        <>
                            <span>{errors.animal}</span>
                            <br />
                        </>
                    ) : null}
                    <label htmlFor="date">Data adopcji</label>
                    <Field name="date" type="date" />
                    <div className="flex items-center py-2">
                        <PrimaryButton busy={isBusy} type="submit">Zapisz</PrimaryButton>
                        {isBusy &&
                            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full ml-4" role="status">
                                <span className="visually-hidden">Ładowanie...</span>
                            </div>
                        }
                    </div>
                </Form>
            )}
        </Formik>
    )
}
