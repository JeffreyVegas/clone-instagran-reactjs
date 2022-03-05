import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/User";
import { toast } from "react-toastify";
import "./InfoForm.scss";

const InfoForm = (props) => {
  const { name, placeholder, setShowModal, getUser, refetch } = props;
  const [updateUser] = useMutation(UPDATE_USER);

  const formik = useFormik({
    initialValues: {
      [name]: getUser[`${name}`] || "",
    },
    validationSchema: Yup.object({
      [name]:
        name === "email"
          ? Yup.string().required().email()
          : Yup.string().required(),
    }),
    onSubmit: async (values) => {
      try {
        const result = await updateUser({
          variables: {
            input: values,
          },
        });

        if (!result.data.updateUser) {
          toast.warning(`Error al actualizar`);
        } else {
          refetch();
          setShowModal(false);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Form className="info-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name={name}
        value={formik.values[`${name}`]}
        placeholder={placeholder}
        onChange={formik.handleChange}
        error={formik.errors[`${name}`] && true}
      />
      <Button type="submit" className="btn-submit">
        Cambiar
      </Button>
    </Form>
  );
};

export default InfoForm;
