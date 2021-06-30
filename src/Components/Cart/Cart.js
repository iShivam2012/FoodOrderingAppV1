import React, { useContext, useState } from "react";
import Overlay from "../Common/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../Store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);

  const ctx = useContext(CartContext);
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const cartItemRemove = (id) => {
    ctx.removeItem(id);
  };
  const cartItemAdd = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={cartItemAdd.bind(null, item)}
          onRemove={cartItemRemove.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const onOrderHandler = () => {
    setIsCheckout(true);
  };

  const onSubmitHandler = (userData) => {
    fetch("https://foodorderingappv1-default-rtdb.firebaseio.com/order.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userData,
        order: ctx.items,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <Overlay onHideCart={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={onSubmitHandler} onCancel={props.onHideCart} />
      )}
      {!isCheckout && (
        <div className={classes.actions}>
          <button onClick={props.onHideCart} className={classes["button--alt"]}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={onOrderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </Overlay>
  );
};

export default Cart;
