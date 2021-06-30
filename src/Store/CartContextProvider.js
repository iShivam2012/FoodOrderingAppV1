import React, { useReducer } from "react";
import CartContext from "./cart-context";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      {
        const updatedTotalAmount =
          state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(
          (item) => action.item.id === item.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItem;
        let updatedItems;
        if (existingCartItem) {
          updatedItem = {
            ...existingCartItem,
            amount: existingCartItem.amount + action.item.amount,
          };
          updatedItems = [...state.items];
          updatedItems[existingCartItemIndex] = updatedItem;
        } else {
          updatedItems = state.items.concat(action.item);
        }
        return {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        };
      }
      break;
    case "REMOVE_ITEM":
      {
        const existingCartItemIndex = state.items.findIndex(
          (item) => item.id === action.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;
        let updatedItem;
        let updatedItems;
        if (existingCartItem.amount === 1) {
          updatedItems = state.items.filter((item) => item.id !== action.id);
        } else {
          updatedItem = {
            ...existingCartItem,
            amount: existingCartItem.amount - 1,
          };
          updatedItems = [...state.items];
          updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        };
      }
      break;
    case "CLEAR":
      return initialState;
    default:
      return initialState;
  }
};

const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, initialState);

  const addItemHandler = (item) => {
    dispatchCartAction({
      type: "ADD_ITEM",
      item: item,
    });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id: id,
    });
  };

  const clearItemHandler = () => {
    dispatchCartAction({
      type: "CLEAR",
    });
  };

  const cartCtx = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearItem: clearItemHandler,
  };

  const { Provider } = CartContext;
  return <Provider value={cartCtx}>{props.children}</Provider>;
};
export default CartContextProvider;
