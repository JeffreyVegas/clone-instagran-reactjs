import { useCallback, useState } from "react";
import { Modal, Icon, Button, Dimmer, Loader } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { UPLOAD_PUBLICATION } from "../../../gql/publication";
import { useDropzone } from "react-dropzone";
import "./ModalUpload.scss";

const ModalUpload = (props) => {
  const { show, setShowModal } = props;
  const [imageUpload, setImageUpload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [uploadPublication] = useMutation(UPLOAD_PUBLICATION);

  const onDrop = useCallback((acceptedfile) => {
    const file = acceptedfile[0];
    setImageUpload({
      type: "image",
      file,
      url: URL.createObjectURL(file),
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const onClose = () => {
    setIsLoading(false);
    setImageUpload(null);
    setShowModal(false);
  };

  const onPublish = async () => {
    try {
      setIsLoading(true);
      const { data } = await uploadPublication({
        variables: {
          file: imageUpload.file,
        },
      });
      if (!data.uploadPublication.status) {
        toast.warning("Erro en la publicacion");
        isLoading(false);
      } else {
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      size="small"
      open={show}
      onClose={() => setShowModal(false)}
      className="modal-upload"
    >
      <div
        {...getRootProps()}
        className="dropzone"
        style={imageUpload && { border: "none" }}
      >
        {!imageUpload && (
          <>
            <Icon name="cloud upload" />
            <p>Arrastra la imagen hasta aquí o haz clic</p>
          </>
        )}

        <input {...getInputProps()} />
      </div>
      {imageUpload?.file && (
        <div
          className="image"
          style={{ backgroundImage: `url("${imageUpload.url}")` }}
        />
      )}

      {imageUpload && (
        <Button className="btn-upload btn-action" onClick={onPublish}>
          Publicar
        </Button>
      )}
      {isLoading && (
        <Dimmer active className="publishing">
          <Loader />
          <p>Publicando...</p>
        </Dimmer>
      )}
    </Modal>
  );
};

export default ModalUpload;
