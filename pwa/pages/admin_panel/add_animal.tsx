import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import axiosInstance from "../../src/utils/axiosInstance";
import useToken from "../../src/utils/useToken";
import PrimaryButton from "../../src/components/PrimaryButton";
import { urlToFile } from "../../src/utils/imgUtils";
import AdminPanelLayout from "../../src/components/layouts/AdminPanelLayout";
import ImageUploading, { ImageListType } from "react-images-uploading";
import SecondaryButton from "../../src/components/SecondaryButton";


function AddAnimal() {
    const [pictures, setPictures] = useState<Array<any>>([]);
    const [isBusy, setIsBusy] = useState(false);
    const [token, setToken] = useState<string | null>();
    const maxNumber = 10;
  
    const onChange = (
      imageList: ImageListType,
      addUpdateIndex: number[] | undefined
    ) => {
      // data for submit
      console.log(imageList, addUpdateIndex);
      setPictures(imageList as never[]);
    };

    useEffect(() => {
        const { token } = useToken();
        setToken(token);
    }, [])
    

    async function handleSubmit(data: any) {
        setIsBusy(true);
        axiosInstance.post("animals", data, { headers: { 'Authorization': `Bearer ${token}` } })
            .then((response) => {
                pictures.map((picture, index) => {
                    urlToFile(picture, index.toString())
                        .then((file) => {
                            if (index == 0 && pictures.length == 1) {
                                axiosInstance.post("media_objects", { file: file, domain: `animal/${response.data.id}`, isMain: true }, { headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "multipart/form-data" } })
                                    .then((response) => {
                                        window.location.replace("/animals")
                                        setIsBusy(false);
                                    });
                            } else if (index == 0) {
                                axiosInstance.post("media_objects", { file: file, domain: `animal/${response.data.id}`, isMain: true }, { headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "multipart/form-data" } })
                            } else if (index != pictures.length - 1) {
                                axiosInstance.post("media_objects", { file: file, domain: `animal/${response.data.id}` }, { headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "multipart/form-data" } })
                                    .then((response) => console.log(response));
                            } else {
                                axiosInstance.post("media_objects", { file: file, domain: `animal/${response.data.id}` }, { headers: { 'Authorization': `Bearer ${token}`, "Content-Type": "multipart/form-data" } })
                                    .then((response) => {
                                        window.location.replace("/animals")
                                        setIsBusy(false);
                                    });
                            }
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
        <AdminPanelLayout>
            <div>
                Dodaj Zwierzę
                <ImageUploading
                    multiple
                    value={pictures}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    maxFileSize={5000000}
                    acceptType={[".jpg", ".png"]}
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps
                    }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                            <PrimaryButton
                                style={isDragging ? { color: "red" } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                Dodaj zdjęcie
                            </PrimaryButton>
                            &nbsp;
                            <SecondaryButton onClick={onImageRemoveAll}>Usuń wszystkie zdjęcia</SecondaryButton>
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img src={image.dataURL} alt="" width="100" />
                                    <div className="image-item__btn-wrapper">
                                        <PrimaryButton onClick={() => onImageUpdate(index)}>Aktualizuj</PrimaryButton>
                                        <SecondaryButton onClick={() => onImageRemove(index)}>Usuń</SecondaryButton>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ImageUploading>
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
                            <Field name="description" placeholder="Opis zwierzęcia" as="textarea" className="w-full" />
                        </label>
                        <div className="flex items-center py-2">
                            <PrimaryButton busy={isBusy} type="submit" className="bg-primary dark:bg-primaryDark dark:text-white">Zapisz</PrimaryButton>
                            {isBusy &&
                                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full ml-4" role="status">
                                    <span className="visually-hidden">Ładowanie...</span>
                                </div>
                            }
                        </div>
                    </Form>
                </Formik>
            </div>
        </AdminPanelLayout>
    )
}

export default AddAnimal;
