import React, { useState } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";

const Home = () => {
  const [page, setPage] = useState(0);
  const { users, isLoading, error } = usePeopleFetch(page);
  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList
          users={users}
          isLoading={isLoading}
          error={error}
          setPage={() => setPage((page) => page + 1)}
        />
      </S.Content>
    </S.Home>
  );
};

export default Home;
