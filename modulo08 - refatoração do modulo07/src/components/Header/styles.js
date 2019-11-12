import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0;
`;

export const Cart = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.7;
  }

  div {
    text-align: right;
    margin-right: 10px;
  }
  strong {
    display: block;
    color: #fff;
  }
  span {
    font-size: 12px;
    color: #999;
  }
`;

export const MyImage = styled.img.attrs({
  src: "https://avatars1.githubusercontent.com/u/48997332?s=460&v=4"
})`
  width:80px;
  height:80px;
  border-radius:50%;
  border: 5px solid #fff;

`;

