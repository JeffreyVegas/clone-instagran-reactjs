import { useState } from "react";
import { Icon } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/client";
import "./Actions.scss";
import { ADD_LIKE, DELETE_LIKE, IS_LIKE, COUNT_LIKES } from "../../../gql/like";

const Actions = (props) => {
  const { publication } = props;
  const [loadingLike, setLoadingLike] = useState(false);

  const { data, loading, refetch } = useQuery(IS_LIKE, {
    variables: {
      idPublication: publication.id,
    },
  });

  const {
    data: dataLikes,
    loading: loadingLikes,
    refetch: refetchLikes,
  } = useQuery(COUNT_LIKES, {
    variables: {
      idPublication: publication.id,
    },
  });

  const [addLike] = useMutation(ADD_LIKE);
  const [deleteLike] = useMutation(DELETE_LIKE);

  if (loading) return null;
  const { isLike } = data;
  if (loadingLikes) return null;
  const { countLikes } = dataLikes;

  const onLike = async () => {
    setLoadingLike(true);
    try {
      await addLike({
        variables: {
          idPublication: publication.id,
        },
      });
      refetch();
      refetchLikes();
    } catch (error) {
      console.log(error);
    }
    setLoadingLike(false);
  };

  const unLike = async () => {
    setLoadingLike(true);
    try {
      await deleteLike({
        variables: {
          idPublication: publication.id,
        },
      });
      refetch();
      refetchLikes();
    } catch (error) {
      console.log(error);
    }
    setLoadingLike(false);
  };

  const actionLike = () => {
    console.log("NOOO");
    if (!loadingLike) {
      if (isLike) {
        unLike();
      } else {
        onLike();
      }
    }
  };

  return (
    <div className="actions">
      <Icon
        name={isLike ? "heart" : "heart outline"}
        className={isLike ? "red" : ""}
        onClick={actionLike}
      />
      <span>
        {countLikes} {countLikes === 1 ? "like" : "likes"}
      </span>
    </div>
  );
};

export default Actions;
