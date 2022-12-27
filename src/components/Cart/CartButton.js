import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import classes from './CartButton.module.css';


const CartButton = (props) => {
  const cartItem = useSelector(state => state.cart.totalQuantity)

  const dispatch = useDispatch();

  const toggleHandler = () => {
    dispatch(uiActions.toggle())
  }

  return (
    <button onClick={toggleHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartItem}</span>
    </button>
  );
};

export default CartButton;
