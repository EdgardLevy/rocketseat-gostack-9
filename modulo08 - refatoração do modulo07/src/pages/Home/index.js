import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { ProductList } from './styles';
import api from '../../services/api';
import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';

//function Home({ amount, addToCartRequest }) {
//export default function Home({ addToCartRequest }) {
export default function Home() {
  /**de: */
  // state = {
  //   products: [],
  // };
  /**para: */
  const [products, setProducts] = useState([]);
  //useSelector do redux retorna o state inteiro
  const amount = useSelector(state => state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}))

  const dispatch = useDispatch();

  /**de */
  // async componentDidMount() {
  //   const response = await api.get('/products');

  //   const data = response.data.map(product => ({
  //     ...product,
  //     priceFormatted: formatPrice(product.price),
  //   }));

  //   // this.setState({products: response.data});
  //   this.setState({products: data});
  // }
  /**para */
  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));
      setProducts(data)
    }
    loadProducts();
  }, [])

  //nao utiliza o useCallback pq essa funcao n depende de nenhum estado
  function handleAddProduct(id) {
    /**de */
    //const { addToCartRequest } = this.props;
    /**para */
    //function Home({ amount,addToCartRequest }) {
    dispatch(CartActions.addToCartRequest(id));
  };

  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>
          <button
            type="button"
            onClick={() => handleAddProduct(product.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#fff" />{' '}
              {amount[product.id] || 0}
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );

}

// const mapStateToProps = state => ({
//   amount: state.cart.reduce((amount, product) => {
//     amount[product.id] = product.amount;
//     return amount;
//   }, {}),
// });

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(CartActions, dispatch);

// export default connect(
//   null,
//   mapDispatchToProps
// )(Home);
