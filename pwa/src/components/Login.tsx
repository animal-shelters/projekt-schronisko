import axios from "axios";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

function Login(): JSX.Element {
  interface loginSchema {
    email: string;
    password: string;
  }

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
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(data);
  }

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
            <button type="submit">Zarejestruj się</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
