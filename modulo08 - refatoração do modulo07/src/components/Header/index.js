import React from 'react';
import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Container, Cart, MyImage } from './styles';
import logo from '../../assets/images/logo.svg';

//function Header({cartSize}) {
export default function Header() {
  // console.log(cart);
  //utilizando o useSelector para acessar o state do redux
  const cartSize = useSelector(state => state.cart.length)
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Rocketshoes" />
      </Link>
      <MyImage />
      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{cartSize} itens</span>
        </div>
        <MdShoppingBasket size={36} color="#fff" />
      </Cart>
    </Container>
  );
}

//export default connect(state => ({ cartSize: state.cart.length }))(Header);
