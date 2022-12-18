import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import axiosInstance from "../src/utils/axiosInstance";
import useToken from "../src/utils/useToken";
import useUser from "../src/utils/useUser";
import PrimaryButton from "../src/components/PrimaryButton";
import Spinner from "../src/components/Spinner";

function Login(): JSX.Element {
  interface loginSchema {
    email: string;
    password: string;
  }

  const [token, saveToken] = useState<string | null>();
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    saveToken(token);
  })

  const loginValidationSchema = Yup.object().shape({
    password: Yup.string().required("To pole jest wymagane."),
    email: Yup.string()
      .email("Podaj poprawny email.")
      .required("To pole jest wymagane."),
  });

  function handleLogin(data: loginSchema) {
    setIsBusy(true);
    axios
      .post("https://localhost/auth", data)
      .then((response) => {
        console.log(response.data);
        if (typeof window !== undefined) {
          sessionStorage.setItem('token', response.data.token);
        }
        axiosInstance
          .get("auth/user", { headers: { 'Authorization': `Bearer ${response.data.token}` } })
          .then((response) => {
            if (typeof window !== undefined) {
              sessionStorage.setItem('user', JSON.stringify({ id: response.data.id, roles: response.data[0].roles }));
            }
            window.location.replace('/');
            setIsBusy(false);
          });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Wprowadzono błędne dane logowania");
        }
        console.log(error);
        setIsBusy(false);
      });
    console.log(data);
  }

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Formik
          initialValues={{
            email: "",
            password: "",
            passwordConfirmation: "",
          }}
          validationSchema={loginValidationSchema}
          onSubmit={(values) => handleLogin(values)}
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
              <div className="flex items-center py-2">
                <PrimaryButton busy={isBusy} type="submit">Zaloguj się</PrimaryButton>
                {isBusy &&
                  <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full ml-4" role="status">
                    <span className="visually-hidden">Ładowanie...</span>
                  </div>
                }
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  } else {
    return (
      <div>
        <div className="text-center">Trwa pobieranie danych użytkownika...</div>
        <Spinner />
      </div>
    )
  }
}

export default Login;