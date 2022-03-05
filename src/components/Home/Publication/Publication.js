import { Image } from "semantic-ui-react";
import UserLink from "../../User/UserLink";
import CommentForm from "../../Comments/CommentForm";
import Actions from "../../Publications/Actions";
import LastComments from "../../Comments/LastComments";
import { useQuery } from "@apollo/client";
import { GET_LAST_COMMENTS } from "../../../gql/comment";
import "./Publication.scss";

const Publication = ({ publication }) => {
  const { data, loading, refetch } = useQuery(GET_LAST_COMMENTS, {
    variables: {
      idPublication: publication.id,
    },
  });
  if (loading) return null;
  const { getLastComments } = data;

  return (
    <div className="publication">
      <UserLink data={publication.idUser} />
      <div className="publication__body">
        <Image src={publication.file} />
        <Actions publication={publication} />
        <LastComments comments={getLastComments} />
        <CommentForm publication={publication} refetch={refetch} />
      </div>
    </div>
  );
};

export default Publication;
