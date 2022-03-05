import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../../gql/comment";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./CommentForm.scss";

const CommentForm = (props) => {
  const { publication, refetch } = props;

  const [addComment] = useMutation(ADD_COMMENT);
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      try {
        await addComment({
          variables: {
            input: {
              idPublication: publication.id,
              comment: values.comment,
            },
          },
        });
        formik.resetForm();
        refetch();
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Form className="comment-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        placeholder="agrega un comentario ..."
        name="comment"
        onChange={formik.handleChange}
        value={formik.values.comment}
        error={formik.errors.comment && true}
      />
      <Button type="submit">Publicar</Button>
    </Form>
  );
};

export default CommentForm;
