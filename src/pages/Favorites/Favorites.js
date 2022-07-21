import React, { useState, useEffect } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import * as S from "./style";
import searchPng from "../../assets/search.png";

const Favorites = () => {
  const [search, setSearch] = useState("");
  const [getItems, setGetItems] = useState(0);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("items")));
  const handleSearch = ({ target }) => {
    setSearch(target.value);
  };

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("items")));
  }, [getItems]);

  return (
    <S.Favorite>
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
          getItems={() => setGetItems((items) => items + 1)}
          users={
            favorites
              ? favorites.filter(
                  (user) =>
                    user.name.first.toLowerCase().includes(search.toLowerCase()) ||
                    user.name.last.toLowerCase().includes(search.toLowerCase()) ||
                    user.name.title.toLowerCase().includes(search.toLowerCase())
                )
              : []
          }
        />
      </S.Content>
    </S.Favorite>
  );
};

export default Favorites;
