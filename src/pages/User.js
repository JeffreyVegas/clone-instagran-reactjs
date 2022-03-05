import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Profile from "../components/User/Profile";
import Publications from "../components/Publications";
import { useQuery } from "@apollo/client";
import { GET_PUBLICATIONS } from "../gql/publication";
import { size } from "lodash";

const User = () => {
  const { username } = useParams();

  const { data, loading, startPolling, stopPolling } = useQuery(
    GET_PUBLICATIONS,
    {
      variables: { username },
    }
  );

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, []);

  if (loading) return null;
  const { getPublications } = data;

  return (
    <div>
      <Profile username={username} numPublications={size(getPublications)} />
      <Publications getPublications={getPublications} />
    </div>
  );
};

export default User;
