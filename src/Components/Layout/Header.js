import React, { Fragment } from "react";
import ReactMeals from "../../Assets/meals.jpg";
import CartButton from "../Cart/CartButton";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Food Fiesta</h1>
        <CartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={ReactMeals} alt="Header image" />
      </div>
    </Fragment>
  );
};
export default Header;
