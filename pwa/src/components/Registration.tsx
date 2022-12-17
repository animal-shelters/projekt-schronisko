import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import axiosInstance from "../utils/axiosInstance";
import useToken from "../utils/useToken";
import useUser from "../utils/useUser";
import PrimaryButton from "./PrimaryButton";

interface registrationSchema {
  email: string;
  password: string;
  passwordConfirmation: string;
}

const registrationValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Hasło musi zawierać przynajmniej 8 znaków.")
    .required("To pole jest wymagane."),
  passwordConfirmation: Yup.string()
    .required("To pole jest wymagane.")
    .oneOf([Yup.ref("password"), null], "Podane hasła nie są identyczne."),
  email: Yup.string()
    .email("Podaj poprawny email.")
    .required("To pole jest wymagane."),
});

function Registration(): JSX.Element {
  const { user, setUser } = useUser();
  const { setToken } = useToken();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistration = (data: registrationSchema) => {
    setIsLoading(true);
    axiosInstance
      .post("users", data)
      .then((response) => {
        setUser({ id: response.data.id, roles: response.data.roles });
        axios
          .post("https://localhost/auth", data)
          .then((response) => {
            setToken(response.data.token);
            window.location.replace('/');
            setIsLoading(false);
          })
      })
      .catch((error) => {
        console.log(error);
        alert("Wystąpił nieoczekiwany błąd");
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Formik
        initialValues={{
          email: "",
          password: "",
          passwordConfirmation: "",
        }}
        validationSchema={registrationValidationSchema}
        onSubmit={(values) => handleRegistration(values)}
      >
        {({ errors, touched }) => (
          <Form>
            <label htmlFor="email">Email:</label>
            <Field name="email" type="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <label htmlFor="password">Hasło:</label>
            <Field name="password" type="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <label htmlFor="passwordConfirmation">Potwierdzenie hasła:</label>
            <Field name="passwordConfirmation" type="password" />
            {errors.passwordConfirmation && touched.passwordConfirmation ? (
              <div>{errors.passwordConfirmation}</div>
            ) : null}
            <div className="flex items-center py-2">
              <PrimaryButton type="submit" className="mt-2" busy={isLoading}>Zarejestruj się</PrimaryButton>
              {isLoading &&
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full ml-4" role="status">
                  <span className="visually-hidden">Ładowanie...</span>
                </div>}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Registration;
