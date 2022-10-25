import axios from "axios";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

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
  const handleRegistration = (data: registrationSchema) => {
    axios
      .post("https://localhost/users", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
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
            <button type="submit">Zarejestruj się</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Registration;
