import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";
import ImageNoFound from "../../../asset/png/avatar.png";
import "./UserLink.scss";

const UserLink = (props) => {
  const { data, modal } = props;
  const onModal = () => {
    if (modal) modal(false);
  };
  return (
    <Link className="user-link" to={`${data.username}`} onClick={onModal}>
      <Image src={data.avatar || ImageNoFound} avatar />
      <div>
        <p>{data.name}</p>
        <p>@{data.username}</p>
      </div>
    </Link>
  );
};

export default UserLink;
