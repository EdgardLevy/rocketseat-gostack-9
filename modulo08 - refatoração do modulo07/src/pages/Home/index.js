import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { ProductList, AddButton } from './styles';
import api from '../../services/api';
import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';
import Loading from '../../components/Loading'
import { FaSpinner } from 'react-icons/fa';
//function Home({ amount, addToCartRequest }) {
//export default function Home({ addToCartRequest }) {
export default function Home() {
  const [loading, setLoading] = useState(false);
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
      setLoading(false)
    }
    setLoading(true)
    loadProducts();
  }, [])


  //nao utiliza o useCallback pq essa funcao n depende de nenhum estado
  function handleAddProduct(id) {
    console.log(`handleAddProduct(${id})`)
    /**de */
    //const { addToCartRequest } = this.props;
    /**para */
    //function Home({ amount,addToCartRequest }) {
    dispatch(CartActions.addToCartRequest(id));
    const data = products.map(product => {
      if (product.id === id)
        product.loading = true
      return product
    })
    setProducts(data);
  };



  /*
  useEffect(() => {
    console.log(productsQueue[productsQueue.length - 1])
    const data = products.map(product => {
      console.log(product.id, (product.id in productsQueue))
      if (product.id in productsQueue) {
        product.loading = true
      }
      return product
    })
    console.log(data);
  }, [productsQueue])*/

  return (
    <>
      {
        //console.log('productsQueue', productsQueue)
        //console.log('Queueing', Queueing);
        //console.log('aQueue', aQueue)
      }
      {loading ? <Loading size={50} /> :

        <ProductList>
          {products.map(product => {
            return (

              < li key={product.id} >
                <img src={product.image} alt={product.title} />
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
                <AddButton loading={product.loading}
                  type="button"
                  onClick={() => handleAddProduct(product.id)}>
                  {product.loading ? (
                    <FaSpinner color="#fff" size={16} />
                  ) : (<>
                    <div>
                      <MdAddShoppingCart size={16} color="#fff" />{' '}
                      {amount[product.id] || 0}
                    </div>
                    <span>ADICIONAR AO CARRINHO</span>
                  </>
                    )
                  }
                </AddButton>
              </li>
            )
          })}
        </ProductList>}
    </>
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
