import { Grid } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import Publication from "../../components/Home/Publication";
import { map } from "lodash";
import { GET_PUBLICATIONS_FOLLOWS } from "../../gql/publication";
import { GET_NO_FOLLOWINGS } from "../../gql/follow";
import UserLink from "../../components/User/UserLink";
import "./Home.scss";

const Home = () => {
  const { data, loading } = useQuery(GET_PUBLICATIONS_FOLLOWS);

  const { data: dataFollow, loading: loadingFollow } =
    useQuery(GET_NO_FOLLOWINGS);

  if (loading) return null;
  if (loadingFollow) return null;

  const { getPublicationsFollows } = data;
  const { getNoFollowings } = dataFollow;

  return (
    <>
      <Grid className="home">
        <Grid.Column width={10} className="home__publications">
          {map(getPublicationsFollows, (publication) => (
            <Publication publication={publication} />
          ))}
        </Grid.Column>
        <Grid.Column width={5} className="home__new-users">
          <p>Personas que quiza conoscas</p>
          {map(getNoFollowings, (user) => (
            <UserLink data={user} />
          ))}
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Home;

/* 
  5 usuarios.

*/