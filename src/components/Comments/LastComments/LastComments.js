import React from "react";

import { map } from "lodash";
import "./LastComments.scss";

const LastComments = (props) => {
  const { comments } = props;
  return (
    <div className="last-comments">
      {map(comments, (comment) => (
        <p className="last-comments__comment">
          <span>{comment.idUser.name}</span>
          {comment.comment}
        </p>
      ))}
      ...
    </div>
  );
};

export default LastComments;
