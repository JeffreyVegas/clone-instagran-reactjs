import { useEffect, useState } from "react";
import { size } from "lodash";
import { Search as SearchSUI, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ImageNoFound from "../../../asset/png/avatar.png";
import { useQuery } from "@apollo/client";
import { SEARCH } from "../../../gql/User";
import "./Search.scss";

const Search = () => {
  const [search, setSearch] = useState(null);
  const [results, setResults] = useState([]);
  const { data, loading } = useQuery(SEARCH, {
    variables: { search },
  });

  useEffect(() => {
    if (size(data?.search) > 0) {
      const users = [];
      data.search.forEach((user, index) => {
        users.push({
          key: index,
          title: user.name,
          username: user.username,
          avatar: user.avatar,
        });
      });
      setResults(users);
    } else {
      setResults([]);
    }
  }, [data]);

  const onChangeSearch = (e) => {
    e.target.value === "" ? setSearch(null) : setSearch(e.target.value);
  };

  const handleResultSelect = () => {
    setSearch(null);
    setResults([]);
  };

  return (
    <SearchSUI
      className="search-user"
      fluid
      value={search || ""}
      loading={loading}
      input={{ icon: "search", iconPosition: "left" }}
      onSearchChange={onChangeSearch}
      results={results}
      onResultSelect={handleResultSelect}
      resultRenderer={(e) => <ResultSearch data={e} />}
      placeholder="Encuentra a tus amigos"
    ></SearchSUI>
  );
};

export default Search;

function ResultSearch(props) {
  const { data } = props;

  return (
    <Link className="search-user__item" to={`${data.username}`}>
      <Image src={data.avatar || ImageNoFound} avatar />
      <div>
        <p>{data.title}</p>
        <p>@{data.username}</p>
      </div>
    </Link>
  );
}
