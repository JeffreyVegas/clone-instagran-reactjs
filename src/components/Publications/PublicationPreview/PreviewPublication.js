import { useState } from "react";
import { Image } from "semantic-ui-react";
import CommentPublication from "../ModalPublication";
import Modal from "../../Modal/ModalBasic";
import "./PreviewPublication.scss";

const PreviewPublication = (props) => {
  const { publication } = props;
  const [showModal, setShowModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState(null);
  const [titleModal, settitleModal] = useState("");

  const onModalPublication = () => {
    setChildrenModal(<CommentPublication publication={publication} />);
    setShowModal(true);
  };
  return (
    <>
      <div className="preview-publication" onClick={onModalPublication}>
        <Image className="preview-publication__image" src={publication.file} />
      </div>
      <Modal
        size="small"
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
      >
        {childrenModal}
      </Modal>
    </>
  );
};

export default PreviewPublication;
