import React, { useContext, useEffect, useState } from "react";
import CartIcon from "./CartIcon";
import classes from "./CartButton.module.css";
import CartContext from "../../Store/cart-context";

const CartButton = (props) => {
  const cardCtx = useContext(CartContext);

  const [isHighlighted, setIsHighlighted] = useState(false);

  const { items } = cardCtx;

  const noOfItems = items.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${isHighlighted ? classes.bump : ""} `;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setIsHighlighted(true);
    const timer = setTimeout(() => {
      setIsHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{noOfItems}</span>
    </button>
  );
};

export default CartButton;
