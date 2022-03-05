import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/User";
import { GET_FOLLOWERS, GET_FOLLOWINGS } from "../../../gql/follow";

import ImageNotFound from "../../../asset/png/avatar.png";
import UserNotFound from "../../UserNotFound";
import ModalBasic from "../../Modal/ModalBasic";
import useAuth from "../../../hooks/useAuth";
import AvatarForm from "../AvatarForm/AvatarForm";
import HeaderProfile from "./HeaderProfile";
import SettingForm from "../SettingForm";
import Followers from "./Followers";
import { Grid, Image } from "semantic-ui-react";
import "./Profile.scss";

const Profile = (props) => {
  const { auth } = useAuth();
  const { username, numPublications } = props;

  const [showModal, setShowModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState(null);
  const [titleModal, settitleModal] = useState("");

  const {
    data: dataFollowers,
    loading: loadingFollowers,
  } = useQuery(GET_FOLLOWERS, { variables: { username } });
  const {
    data: dataFollowings,
    loading: loadingFollowings,
  } = useQuery(GET_FOLLOWINGS, { variables: { username } });

  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: { username },
  });

  if (loading) return null;
  if (error) return <UserNotFound />;
  const { getUser } = data;

  if (loadingFollowers) return null;
  const { getFollowers } = dataFollowers;
  if (loadingFollowings) return null;
  const { getFollowings } = dataFollowings;

  const handleModal = (type) => {
    switch (type) {
      case "avatar":
        settitleModal("Cambiar Imagen");
        setChildrenModal(
          <AvatarForm setShowModal={setShowModal} auth={auth} />
        );
        setShowModal(true);
        break;
      case "settings":
        settitleModal("");
        setChildrenModal(
          <SettingForm
            setChildrenModal={setChildrenModal}
            setShowModal={setShowModal}
            settitleModal={settitleModal}
            refetch={refetch}
            getUser={getUser}
          />
        );
        setShowModal(true);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Grid className="profile">
        <Grid.Column width={5} className="profile__left">
          <Image
            src={getUser.avatar || ImageNotFound}
            avatar
            onClick={() => username === auth.username && handleModal("avatar")}
          />
        </Grid.Column>
        <Grid.Column width={11} className="profile__right">
          <HeaderProfile
            getUser={getUser}
            auth={auth}
            handleModal={handleModal}
          />
          <Followers
            followings={getFollowings}
            followers={getFollowers}
            publications={numPublications}
          />
          <div className="others">
            <p className="name">{getUser.name}</p>
            {getUser.siteWeb && (
              <a
                href={getUser.siteWeb}
                className="siteWeb"
                target="_blank"
                rel="noreferrer"
              >
                {getUser.siteWeb}
              </a>
            )}
            {getUser.description && (
              <p className="description">{getUser.description}</p>
            )}
          </div>
        </Grid.Column>
      </Grid>

      <ModalBasic
        size="mini"
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
      >
        {childrenModal}
      </ModalBasic>
    </>
  );
};

export default Profile;
