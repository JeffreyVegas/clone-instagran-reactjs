import { useState } from "react";
import { map, size } from "lodash";
import Modal from "../../../Modal/ModalBasic";
import UserLink from "../../UserLink";
import "./Followers.scss";

const Followers = (props) => {
  const { followers, followings, publications } = props;
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [children, setChildren] = useState(null);

  const onShowFollowers = (type) => {
    switch (type) {
      case "followers":
        setTitle("seguidores");
        setChildren(
          <div>
            {map(followers, (user, index) => (
              <UserLink data={user} key={index} modal={setShowModal} />
            ))}
          </div>
        );
        setShowModal(true);
        break;
      case "followings":
        setTitle("seguidos");
        setChildren(
          <div>
            {map(followings, (user, index) => (
              <UserLink data={user} key={index} modal={setShowModal} />
            ))}
          </div>
        );
        setShowModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="followers">
        <p>
          {publications}
          <span>publicaciones</span>
        </p>
        <p className="link" onClick={() => onShowFollowers("followers")}>
          {size(followers)}
          <span>seguidores</span>
        </p>
        <p className="link" onClick={() => onShowFollowers("followings")}>
          {size(followings)}
          <span>seguidos</span>
        </p>
      </div>
      <Modal size="mini" show={showModal} setShow={setShowModal} title={title}>
        {children}
      </Modal>
    </>
  );
};

export default Followers;
