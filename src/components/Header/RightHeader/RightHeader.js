import { Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/User";
import ImageNotFound from "../../../asset/png/avatar.png";
import useAuth from "../../../hooks/useAuth";
import ModalUpload from "../../Modal/ModalUpload";
import { useState } from "react";
import "./RightHeader.scss";

const RightHeader = () => {
  const { auth } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      username: auth.username,
    },
  });

  if (loading || error) return null;
  const { getUser } = data;

  return (
    <>
      <div className="reight-header">
        <Link to="/">
          <Icon name="home" />
        </Link>
        <Icon name="plus" onClick={() => setShowModal(true)} />
        <Link to={`/${auth.username}`}>
          <Image src={getUser.avatar || ImageNotFound} avatar />
        </Link>
      </div>
      <ModalUpload show={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default RightHeader;
