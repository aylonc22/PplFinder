import styled from "styled-components";

export const Favorite = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-block-start: 70px;
`;

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  height: 40px;
  width: 240px;
  border-radius: 50px;
  border: 0px;
  margin-bottom: 10px;
`;

export const Search = styled.input`
  height: 40px;
  width: 240px;
  padding: 6px 35px;
  border-radius: 50px;
  margin: 5px;
  border: 0px;
  outline: 1px solid gray;
  &:focus {
    outline: 1px solid black;
  }
`;

export const ImageSearch = styled.img`
  position: absolute;
  top: 13px;
  left: 10px;
  height: 25px;
  width: 25x;
`;

export const Header = styled.div`
  display: flex;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  max-width: 400px;
  width: 100%;
`;
