import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { decrement, increment, removeProductFromCart } from '../../../store/UserSlice';
import classes from './QuantityBlock.module.css';

interface IQuantityBlockProps {
  id: string;
}

const QuantityBlock: React.FC<IQuantityBlockProps> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.user);
  const productInCart = cart.find((cartItem) => cartItem.id === id);

  const incrementHandler = () => {
    dispatch(increment(id));
  };

  const decrementHandler = () => {
    dispatch(decrement(id));

    if (productInCart?.quantity === 1) {
      dispatch(removeProductFromCart(id));
      return;
    }
  };

  return (
    <div className={classes['quantity-block']}>
      <button className={classes.button} onClick={decrementHandler}>
        <span className={classes['button-text']}>-</span>
      </button>

      <span className={classes.quantity}>{productInCart?.quantity || 1}</span>
      <button className={classes.button} onClick={incrementHandler}>
        <span className={classes['button-text']}>+</span>
      </button>
    </div>
  );
};

export default QuantityBlock;
