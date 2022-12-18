import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import PrimaryButton from "../../src/components/PrimaryButton";
import User from "../../src/models/user-type";
import Animal from "../../src/models/animal.dto";
import axiosInstance from "../../src/utils/axiosInstance";
import useToken from "../../src/utils/useToken";
import { dateToInputFormat, stringDateToInputFormat } from "../../src/utils/dateUtils";
import { mapAdoption, mapAdoptionToDto } from "../../src/models/adoption.dto";
import { AxiosResponse } from "axios";
import Spinner from "../../src/components/Spinner";
import { useRouter } from "next/router";
import AdminPanelLayout from "../../src/components/layouts/AdminPanelLayout";

interface AdoptionSchema {
    user: string;
    animal: string;
    date: string;
}

export default function AddAdoption() {
    const [isLoading, setIsLoading] = useState(false);
    const [initialValues, setInitialValues] = useState<AdoptionSchema | null>(null);

    const router = useRouter();
    const { id } = router.query;
    const [isBusy, setIsBusy] = useState(false);
    const [users, setUsers] = useState<Array<User>>([]);
    const [animals, setAnimals] = useState<Array<Animal>>([]);
    const [token, setToken] = useState<string | null>();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setToken(token);

        if (id) {
            setIsLoading(true);
            axiosInstance.get(`adoptions/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
                .then((response: AxiosResponse<any>) => {
                    let adoption = mapAdoption(response.data["hydra:member"][0]);
                    setInitialValues({
                        animal: adoption.animalId.toString(),
                        user: adoption.userId.toString(),
                        date: stringDateToInputFormat(adoption.date)
                    });
                })
                .catch((error) => {
                    console.error(error);
                    alert("Wystąpił problem podczas ładowania danych adopcji");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
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
        if (!initialValues) {
            axiosInstance.post("adoptions", mapAdoptionToDto(data), { headers: { 'Authorization': `Bearer ${token}` } })
                .then((_) => {
                    alert("Poprawnie zapisano adopcję");
                    window.location.replace('/admin_panel/adoptions');
                }).catch((error) => {
                    console.error(error);
                    alert("Wystąpił problem przy zapisywaniu adopcji");
                })
        } else {
            axiosInstance.put(`adoptions/${id}`, mapAdoptionToDto(data), { headers: { 'Authorization': `Bearer ${token}` } })
                .then((_) => {
                    alert("Poprawnie zapisano adopcję");
                    window.location.replace('/admin_panel/adoptions');
                }).catch((error) => {
                    console.error(error);
                    alert("Wystąpił problem przy zapisywaniu adopcji");
                })
        }
        setIsBusy(false);
    }

    if (isLoading) {
        return (
            <Spinner />
        );
    }

    return (
        <AdminPanelLayout>
            <Formik
                initialValues={initialValues
                    ? initialValues
                    : {
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
        </AdminPanelLayout>
    )
}
