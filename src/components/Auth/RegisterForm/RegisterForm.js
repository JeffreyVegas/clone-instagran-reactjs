import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { REGISTER } from "../../../gql/User";
import { useMutation } from "@apollo/client";
import "./RegisterForm.scss";

const RegisterForm = (props) => {
  const { setShowLogin } = props;
  const [register] = useMutation(REGISTER);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      name: Yup.string().required("tu nombre es obligatorio"),
      username: Yup.string()
        .matches(
          /^[a-zA-Z0-9-]*$/,
          "El nombre del usuario no debe tener espacios"
        )
        .required("EL nombre de usuario es obligatorio"),
      email: Yup.string().email("Email incorrecto").required("Funciona "),
      password: Yup.string()
        .required()
        .oneOf([Yup.ref("repeatPassword")]),
      repeatPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password")]),
    }),
    onSubmit: async (values) => {
      try {
        const newUser = values;
        console.log(values);
        delete newUser.repeatPassword;
        await register({
          variables: {
            input: newUser,
          },
        });
        formik.resetForm();
        toast.success("Ya estas registrado. :)");
        setShowLogin(true);
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <>
      <h2 className="register-form-title">
        Registrate para ver fotos y videos de tus amigos
      </h2>
      <Form className="register-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          type="text"
          placeholder="Nombre y apellidos"
          name="name"
          onChange={formik.handleChange}
          error={formik.errors.name && true}
        />
        <Form.Input
          type="text"
          placeholder="Nombre de Usuario"
          name="username"
          onChange={formik.handleChange}
          error={formik.errors.username && true}
        />
        <Form.Input
          type="text"
          placeholder="Correo Electronico"
          name="email"
          onChange={formik.handleChange}
          error={formik.errors.email && true}
        />
        <Form.Input
          type="password"
          placeholder="Contrasena"
          name="password"
          onChange={formik.handleChange}
          error={formik.errors.password && true}
        />
        <Form.Input
          type="password"
          placeholder="Repetir Contrasena"
          name="repeatPassword"
          onChange={formik.handleChange}
          error={formik.errors.repeatPassword && true}
        />
        <Button type="submit" className="btn-submit">
          Registrarse
        </Button>
      </Form>
    </>
  );
};

export default RegisterForm;

function initialValues() {
  return {
    name: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
}
