import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axiosInstance from "../utils/axiosInstance";
import useToken from "../utils/useToken";
import useUser from "../utils/useUser";
import PrimaryButton from "./PrimaryButton";

function Login(): JSX.Element {
  interface loginSchema {
    email: string;
    password: string;
  }

  const { token, setToken } = useToken();
  const { user, setUser } = useUser();

  const loginValidationSchema = Yup.object().shape({
    password: Yup.string().required("To pole jest wymagane."),
    email: Yup.string()
      .email("Podaj poprawny email.")
      .required("To pole jest wymagane."),
  });

  function handleLogin(data: loginSchema) {
    axios
      .post("https://localhost/auth", data)
      .then((response) => {
        console.log(response.data);
        setToken(response.data.token);
        window.location.replace('/');
        axiosInstance.get("auth/user", { headers: { 'Authorization': `Bearer ${response.data.token}` } }).then((response) => setUser({ id: response.data.id, roles: response.data[0].roles }));
      })
      .catch((error) => {
        console.log(error);
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
              <PrimaryButton type="submit" className="bg-primary dark:bg-primaryDark dark:text-white">Zaloguj się</PrimaryButton>
            </Form>
          )}
        </Formik>
      </div>
    );
  } else {
    return (
      <h1>Jesteś już zalogowany!</h1>
    )
  }
}

export default Login;
