import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/features/cart/cartSlice';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import PropTypes from 'prop-types';

const AddToCartBtn = ({ book, btnClass, iconClass, textClass, cartQuantity}) => {
    
    const dispatch = useDispatch();

    const handleCartClick = () => {
        dispatch(addToCart({...book, cartQuantity: cartQuantity || 1}));
    }

  return (
    <button 
        onClick={handleCartClick}
        type="submit"
        disabled={book.stock === 0}
        className={twMerge("btn-primary flex flex-row items-center justify-center space-x-3 text-white pt-30 disabled:opacity-50", btnClass)}
        >
        <ShoppingCartIcon className={twMerge('size-7', iconClass)} />
        <span className={twMerge('font-normal text-lg', textClass)}>Add to Cart</span>
    </button>
  )
}

AddToCartBtn.propTypes = {
    book: PropTypes.shape({
        stock: PropTypes.number.isRequired,
    }).isRequired,
    btnClass: PropTypes.string,
    iconClass: PropTypes.string,
    textClass: PropTypes.string,
    cartQuantity: PropTypes.number,
};

export default AddToCartBtn