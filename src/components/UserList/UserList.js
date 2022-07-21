import React, { useEffect, useState, useCallback, useRef } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ users, isLoading, error, setPage, isSearch, getItems }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [countries, setCountries] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleCheckBox = (value) => {
    if (countries.includes(value))
      setCountries(countries.filter((country) => country != value));
    else {
      let temp = [...countries, value];
      setCountries(temp);
    }
  };

  const handleFavorites = (user) => {
    let favorites = JSON.parse(localStorage.getItem("items"));
    let filterFavorites = favorites
      ? favorites.filter((favorite) => user.login.username != favorite.login.username)
      : null;
    if ((!filterFavorites && !favorites) || filterFavorites.length === favorites.length) {
      localStorage.setItem(
        "items",
        JSON.stringify(favorites ? [...favorites, user] : [user])
      );
      setFavorites(favorites ? [...favorites, user] : [user]);
    } else {
      localStorage.setItem("items", JSON.stringify(filterFavorites));
      setFavorites(filterFavorites);
    }
    getItems && getItems();
  };
  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };
  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("items")));
  }, []);

  const observer = useRef();
  const lastUserRef = useCallback(
    (user) => {
      if (isSearch || isLoading || isLoading === undefined) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage();
        }
      });
      if (user) observer.current.observe(user);
    },
    [isLoading, setPage]
  );
  const filertedUsers = users.filter(
    (user) => countries.length === 0 || countries.includes(user.location.country)
  );
  const lastUser = filertedUsers[filertedUsers.length - 1];
  return (
    <S.UserList>
      <S.Filters>
        <CheckBox handleCheckBox={(value) => handleCheckBox(value)} label="Brazil" />
        <CheckBox handleCheckBox={(value) => handleCheckBox(value)} label="Australia" />
        <CheckBox handleCheckBox={(value) => handleCheckBox(value)} label="Canada" />
        <CheckBox handleCheckBox={(value) => handleCheckBox(value)} label="Germany" />
        <CheckBox handleCheckBox={(value) => handleCheckBox(value)} label="Denmark" />
      </S.Filters>
      <S.List>
        {users.map((user, index) => {
          if (
            countries.length === 0 ||
            (countries.includes(user.location.country) && !error)
          ) {
            if (user.login.username === lastUser.login.username)
              return (
                <S.User
                  ref={lastUserRef}
                  key={index}
                  onMouseEnter={() => {
                    handleMouseEnter(index);
                  }}
                  onMouseLeave={handleMouseLeave}
                >
                  <S.UserPicture src={user?.picture.large} alt="" />
                  <S.UserInfo>
                    <Text size="22px" bold>
                      {user?.name.title} {user?.name.first} {user?.name.last}
                    </Text>
                    <Text size="14px">{user?.email}</Text>
                    <Text size="14px">
                      {user?.location.street.number} {user?.location.street.name}
                    </Text>
                    <Text size="14px">
                      {user?.location.city} {user?.location.country}
                    </Text>
                  </S.UserInfo>
                  <S.IconButtonWrapper
                    onClick={() => handleFavorites(user)}
                    isVisible={
                      index === hoveredUserId ||
                      (favorites &&
                        favorites.filter(
                          (favorite) => favorite.login.username === user.login.username
                        ).length > 0)
                    }
                  >
                    <IconButton>
                      <FavoriteIcon color="error" />
                    </IconButton>
                  </S.IconButtonWrapper>
                </S.User>
              );
            else
              return (
                <S.User
                  key={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <S.UserPicture src={user?.picture.large} alt="" />
                  <S.UserInfo>
                    <Text size="22px" bold>
                      {user?.name.title} {user?.name.first} {user?.name.last}
                    </Text>
                    <Text size="14px">{user?.email}</Text>
                    <Text size="14px">
                      {user?.location.street.number} {user?.location.street.name}
                    </Text>
                    <Text size="14px">
                      {user?.location.city} {user?.location.country}
                    </Text>
                  </S.UserInfo>
                  <S.IconButtonWrapper
                    onClick={() => handleFavorites(user)}
                    isVisible={
                      index === hoveredUserId ||
                      (favorites &&
                        favorites.filter(
                          (favorite) => favorite.login.username === user.login.username
                        ).length > 0)
                    }
                  >
                    <IconButton>
                      <FavoriteIcon color="error" />
                    </IconButton>
                  </S.IconButtonWrapper>
                </S.User>
              );
          }
        })}
        {!isSearch && !error && isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
        {error && (
          <S.Error>
            <Text>Error Occurred</Text>
          </S.Error>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
