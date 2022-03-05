import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";
import ImageNotFound from "../../../asset/png/avatar.png";
import "./Comment.scss";

const Comment = (props) => {
  const { comment } = props;
  console.log(comment.idUser.username);

  return (
    <Link to="/" className="comment">
      <Image src={comment.idUser.avatar || ImageNotFound} avatar />
      <p>
        <span>{comment.idUser.username} </span>
        {comment.comment}
      </p>
    </Link>
  );
};

export default Comment;
