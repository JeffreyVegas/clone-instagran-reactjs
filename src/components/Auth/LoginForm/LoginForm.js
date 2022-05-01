import { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { decodeToken } from "../../../utils/token";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../../gql/User";
import { setToken } from "../../../utils/token";
import useAuth from "../../../hooks/useAuth";
import "./LoginForm.scss";

const LoginForm = () => {
  const [login] = useMutation(LOGIN);
  const [error, setError] = useState("");
  const { setUser } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    onSubmit: async (valuesForm) => {
      setError("");
      try {
        const { data } = await login({
          variables: {
            input: valuesForm,
          },
        });
        const { token } = data.login;
        setToken(token);
        setUser(decodeToken(token));
      } catch (error) {
        setError(error.message);
      }
    },
  });
  return (
    <>
      <h2 className="login-form-title">
        Inicia para ver las publicaciones de tus amigos
      </h2>
      <span className="user_default">
        Puedes usar este: jeffrey@gmail.com - pass: 123456
      </span>
      <Form className="login-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          type="text"
          placeholder="Ingresa Email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email && true}
        />
        <Form.Input
          type="password"
          placeholder="Contrasena"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password && true}
        />
        <Button type="submit" className="btn-submit">
          Iniciar
        </Button>
        {error ? <p className="error-submit">{error}</p> : null}
      </Form>
    </>
  );
};

export default LoginForm;

function initialValues() {
  return {
    email: "",
    password: "",
  };
}
