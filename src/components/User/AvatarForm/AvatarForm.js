import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { GET_USER, UPDATE_AVATAR, DELETE_AVATAR } from "../../../gql/User";
import { toast } from "react-toastify";
import "./AvatarForm.scss";

const AvatarForm = (props) => {
  const { setShowModal, auth } = props;
  const [updateAvatar] = useMutation(UPDATE_AVATAR, {
    update(cache, { data: { updateAvatar } }) {
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: { username: auth.username },
      });
      cache.writeQuery({
        query: GET_USER,
        variables: { username: auth.username },
        data: {
          getUser: { ...getUser, avatar: updateAvatar.urlAvatar },
        },
      });
    },
  });
  const [deleteAvatar] = useMutation(DELETE_AVATAR, {
    update(cache) {
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: { username: auth.username },
      });
      cache.writeQuery({
        query: GET_USER,
        variables: { username: auth.username },
        data: {
          getUser: { ...getUser, avatar: "" },
        },
      });
    },
  });

  const [loading, setLoading] = useState(false);
  const onDrop = useCallback(
    async (acceptedFile) => {
      const file = acceptedFile[0];
      try {
        setLoading(true);
        const result = await updateAvatar({
          variables: { file },
        });
        const { data } = result;
        if (!data.updateAvatar.status) {
          toast.warning("Error al actulizar el avatar");
          setLoading(false);
        } else {
          setLoading(false);
          setShowModal(false);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [updateAvatar, setShowModal]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jepg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });
  const onDeleteAvatar = async () => {
    try {
      const result = await deleteAvatar();
      const { data } = result;
      if (!data.deleteAvatar) {
        toast.warning("Error al borrar Avtar");
      } else {
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="avatar-form">
      <Button {...getRootProps()} loading={loading}>
        Subir foto
      </Button>
      <Button onClick={onDeleteAvatar}>Elimianr Foto actual</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
      <input {...getInputProps()} />
    </div>
  );
};

export default AvatarForm;
