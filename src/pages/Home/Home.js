import React, { useState } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import searchPng from "../../assets/search.png";
import { usePeopleFetch } from "hooks";
import * as S from "./style";

const Home = () => {
  const [page, setPage] = useState(0);
  const { users, isLoading, error } = usePeopleFetch(page);
  const [search, setSearch] = useState("");

  const handleSearch = ({ target }) => {
    setSearch(target.value);
  };

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <S.SearchWrapper>
          <S.ImageSearch src={searchPng} />
          <S.Search type="text" placeholder="Search" onChange={handleSearch} />
        </S.SearchWrapper>
        <UserList
          isSearch={search.length > 0}
          users={users.filter(
            (user) =>
              user.name.first.toLowerCase().includes(search.toLowerCase()) ||
              user.name.last.toLowerCase().includes(search.toLowerCase()) ||
              user.name.title.toLowerCase().includes(search.toLowerCase())
          )}
          isLoading={isLoading}
          error={error}
          setPage={() => setPage((page) => page + 1)}
        />
      </S.Content>
    </S.Home>
  );
};

export default Home;
