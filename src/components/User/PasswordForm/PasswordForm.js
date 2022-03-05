import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/User";
import { toast } from "react-toastify";
import "./PasswordForm.scss";

const PasswordForm = ({ onlogout }) => {
  const [updateUser] = useMutation(UPDATE_USER);

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      repeatNewPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required(),
      newPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("repeatNewPassword")]),
      repeatNewPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("newPassword")]),
    }),
    onSubmit: async (values) => {
      try {
        const result = await updateUser({
          variables: {
            input: {
              currentPassword: values.currentPassword,
              newPassword: values.newPassword,
            },
          },
        });
        if (!result.data.updateUser) {
          toast.warning("Error al cambiar contrasena");
        } else {
          toast.success("tu contrasena ha sido cambiada");
          onlogout();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Form className="password-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        type="password"
        placeholder="contrasena actual"
        name="currentPassword"
        onChange={formik.handleChange}
        error={formik.errors.currentPassword && true}
      />
      <Form.Input
        type="password"
        placeholder="nueva contrasena"
        name="newPassword"
        onChange={formik.handleChange}
        value={formik.values.newPassword}
        error={formik.errors.newPassword && true}
      />
      <Form.Input
        type="password"
        placeholder="repetir nueva contrasena"
        name="repeatNewPassword"
        onChange={formik.handleChange}
        error={formik.errors.repeatNewPassword && true}
      />
      <Button type="submit" className="btn-submit">
        Cambiar
      </Button>
    </Form>
  );
};

export default PasswordForm;
