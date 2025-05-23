import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage
const loadCartState = () => {
  try {
    const stored = localStorage.getItem('cart');
    const parsedCart = stored ? JSON.parse(stored) : { cartItems: [], subtotalAmount: 0, totalQuantity: 0 };
    return {
      cartItems: parsedCart.cartItems || [],
      subtotalAmount: parsedCart.subtotalAmount || 0,
      totalQuantity: parsedCart.totalQuantity || 0,
    };
  } catch {
    return {
        cartItems: [],
        subtotalAmount: 0,
        totalQuantity: 0,};
  }
};

const initialState = loadCartState();

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            console.log("addToCart", action.payload);
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload._id);
            const quantityToAdd = action.payload.cartQuantity || 1
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += quantityToAdd;
            } else {
                const tempProduct = { ...action.payload, cartQuantity: quantityToAdd };
                state.cartItems.push(tempProduct);
            }
            state.totalQuantity += quantityToAdd;
            state.subtotalAmount += action.payload.finalPrice * quantityToAdd;
            state.subtotalAmount = parseFloat(state.subtotalAmount.toFixed(2));
        },
        removeFromCart: (state, action) => {
            const nextCartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
            state.totalQuantity -= action.payload.cartQuantity;
            state.subtotalAmount -= action.payload.finalPrice * action.payload.cartQuantity;
            state.cartItems = nextCartItems;
            state.subtotalAmount = parseFloat(state.subtotalAmount.toFixed(2));
        },
        decreaseCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;
                state.totalQuantity -= 1;
                state.subtotalAmount -= action.payload.finalPrice;
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter((cartItem) => cartItem.id !== action.payload.id);
                state.cartItems = nextCartItems;
                state.totalQuantity -= 1;
                state.subtotalAmount -= action.payload.finalPrice * action.payload.cartQuantity;
            }
            state.subtotalAmount = parseFloat(state.subtotalAmount.toFixed(2));
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.subtotalAmount = 0;
            state.totalQuantity = 0;
            localStorage.removeItem("cart");
        },
    },
});
export const { addToCart, removeFromCart, decreaseCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;