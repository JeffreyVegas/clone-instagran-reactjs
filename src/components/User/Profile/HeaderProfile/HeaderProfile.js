import { Button } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/client";
import { IS_FOLLOW, FOLLOW, UN_FOLLOW } from "../../../../gql/follow";
import "./HeaderProfile.scss";

const HeaderProfile = (props) => {
  const { getUser, auth, handleModal } = props;

  const [follow] = useMutation(FOLLOW);
  const [unfollow] = useMutation(UN_FOLLOW);

  const onFollow = async () => {
    try {
      await follow({
        variables: {
          username: getUser.username,
        },
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const onUnFollow = async () => {
    try {
      await unfollow({
        variables: {
          username: getUser.username,
        },
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  const { data, loading, refetch } = useQuery(IS_FOLLOW, {
    variables: {
      username: getUser.username,
    },
  });

  if (loading) return null;
  const { isFollow } = data;

  const onShowModal = () => {
    handleModal("settings");
  };

  return (
    <div className="header-profile">
      <h2>{getUser.username}</h2>
      {getUser.username === auth.username ? (
        <Button onClick={onShowModal}>Ajustes</Button>
      ) : isFollow ? (
        <Button className="unfollow" onClick={onUnFollow}>
          dejar de seguir
        </Button>
      ) : (
        <Button className="follow" onClick={onFollow}>
          seguir
        </Button>
      )}
    </div>
  );
};

export default HeaderProfile;
