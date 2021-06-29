import React, { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../Store/cart-context";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const addCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      description: props.description,
      amount: amount,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.description}>{props.description} </div>
        <div className={classes.price}>{price} </div>
      </div>
      <div>
        <MealItemForm onAddToCart={addCartHandler} id={props.id} />
      </div>
    </li>
  );
};

export default MealItem;
