import { Grid, Image } from "semantic-ui-react";
import BoxComments from "../../Comments/BoxComments";
import CommentForm from "../../Comments/CommentForm";
import Actions from "../Actions";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS } from "../../../gql/comment";
import "./ModalPublication.scss";

const ModalPublication = (props) => {
  const { publication } = props;
  const { data, loading, refetch } = useQuery(GET_COMMENTS, {
    variables: {
      idPublication: publication.id,
    },
  });
  if (loading) return null;
  const { getComment } = data;

  return (
    <Grid className="comment-publication">
      <Grid.Column className="comment-publication__image">
        <Image src={publication.file} />
      </Grid.Column>
      <Grid.Column className="comment-publication__comments">
        <BoxComments publication={publication} comments={getComment} />
        <div style={{ flex: 1 }}>
          <Actions publication={publication} />
        </div>
        <CommentForm publication={publication} refetch={refetch} />
      </Grid.Column>
    </Grid>
  );
};

export default ModalPublication;
