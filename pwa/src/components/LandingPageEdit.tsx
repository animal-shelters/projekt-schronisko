import { Field, Form, Formik } from "formik";
import { useState } from "react";
import LandingPageDto from "../models/landing-page-meta.dto";
import axiosInstance from "../utils/axiosInstance";
import { urlToFile, urlToFileName } from "../utils/imgUtils";
import useToken from "../utils/useToken";
import PrimaryButton from "./PrimaryButton";
import UploadComponent from "./UploadImage";

export interface LandingPageSchema {
    banner: string[];
    about: [string, string, string];
    contact: {
        name: string;
        addressFirstLine: string;
        addressSecondLine: string;
        nip: string;
        krs: string;
        email: string;
        mapHref: string;
    };
}

function LandingPageEdit() {
    const [pictures, setPictures] = useState<Array<any>>([]);
    const { token } = useToken();

    function handleChange(files: Array<any>) {
        setPictures(files)
    };

    function handleSubmit(values: any) {
        console.log(JSON.stringify(values));
        axiosInstance.post("site_metas", { metaKey: "landing_page", jsonValue: [JSON.stringify(values)] }, { headers: { 'Authorization': `Bearer ${token}` } })
            .catch((error) => {
                console.error(error);
                alert("Wystąpił błąd podczas zapisywania danych");
            })
        pictures.map((picture, index) => {
            urlToFile(picture, index.toString())
                .then((file) => {
                    axiosInstance.post("media_objects", { file: file, domain: `banner` }, { headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "multipart/form-data" } })
                        .then((response) => console.log(response));
                })
                .catch((error) => {
                    console.error(error);
                    alert("Wystąpił błąd podczas zapisywania obrazów");
                });
        })
    }

    return (<div>
        <Formik
            initialValues={{
                about: [
                    "",
                    "",
                    ""
                ],
                contact: {
                    name: "",
                    addressFirstLine: "",
                    addressSecondLine: "",
                    nip: "",
                    krs: "",
                    email: "",
                    mapHref: "",
                }
            }}
            onSubmit={(values) => handleSubmit(values)}>
            <Form className="w-full">
                <Field name="banner" as="fieldset" className="border-2 border-dashed p-4 pt-6 mt-4">
                    <legend className="text-2xl">Baner</legend>
                    <UploadComponent maxFileSize={5000000} imgExtension={[".jpg", ".png"]} handleChange={handleChange} />
                    {pictures.map((picture, index) => {
                        return (
                            <>
                                <label htmlFor={`banner.${index}`}>{urlToFileName(picture)}</label>
                                <Field name={`banner.${index}`} placeholder="Tekst alternatywny" className="mb-4" />
                            </>
                        );
                    })}
                </Field>
                <Field name="about" as="fieldset" className="border-2 border-dashed p-4 pt-6 mt-4">
                    <legend className="text-2xl">O schronisku</legend>
                    <ul className="list-disc text-left ml-4">
                        <li><Field name="about.0" placeholder="Informacje o schronisku..." /></li>
                        <li><Field name="about.1" placeholder="Informacje o schronisku..." /></li>
                        <li><Field name="about.2" placeholder="Informacje o schronisku..." /></li>
                    </ul>
                </Field>
                <Field name="contact" as="fieldset" className="border-2 border-dashed p-4 pt-6 mt-4">
                    <legend className="text-2xl">Kontakt</legend>
                    <label htmlFor="contact.name">Nazwa</label>
                    <Field name="contact.name" placeholder="Nazwa schroniska" className="mb-4" />

                    <label htmlFor="contact.addressFirstLine">Ulica i numer</label>
                    <Field name="contact.addressFirstLine" placeholder="Ulica i nr" className="mb-4" />

                    <label htmlFor="contact.addressSecondLine">Kod pocztowy i nazwa miejscowości</label>
                    <Field name="contact.addressSecondLine" placeholder="Kod pocztowy i nazwa miejscowości" className="mb-4" />

                    <label htmlFor="contact.nip">NIP</label>
                    <Field name="contact.nip" placeholder="NIP" className="mb-4" />

                    <label htmlFor="contact.krs">KRS</label>
                    <Field name="contact.krs" placeholder="KRS" className="mb-4" />

                    <label htmlFor="cntact.email">Email</label>
                    <Field name="contact.email" placeholder="Adres poczty email" type="email" className="mb-4" />

                    <label htmlFor="contact.mapHref">Link google maps</label>
                    <Field name="contact.mapHref" placeholder="Link do map google" />
                </Field>
                <PrimaryButton type="submit" className="bg-primary dark:bg-primaryDark dark:text-white mt-4 mb-8">Zapisz</PrimaryButton>
            </Form>
        </Formik>
    </div>);
}

export default LandingPageEdit;
