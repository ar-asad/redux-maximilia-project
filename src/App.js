import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
// import { postCart } from './store/cart-slice';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';
import { fatchCartData, sendCartData } from './store/cart-slice';

let isinitial = true;

function App() {
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification)
  const showCart = useSelector(state => state.ui.cartIsVisible)
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fatchCartData())
  }, [dispatch])

  useEffect(() => {
    if (isinitial) {
      isinitial = false
      return
    }
    if (cart.change) {
      dispatch(sendCartData(cart))
    }

  }, [cart, dispatch]);


  return (
    <Fragment>
      {notification && <Notification
        status={notification.status}
        title={notification.title}
        message={notification.message}
      />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>

  );
}

export default App;
