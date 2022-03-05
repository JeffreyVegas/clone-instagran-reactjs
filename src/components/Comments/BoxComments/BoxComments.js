import Comment from "../Comment";
import { map } from "lodash";
import "./BoxComments.scss";

const BoxComments = (props) => {
  const { comments } = props;

  return (
    <>
      <div className="box-comment">
        {map(comments, (comment, index) => (
          <Comment comment={comment} key={index} />
        ))}
      </div>
    </>
  );
};

export default BoxComments;
