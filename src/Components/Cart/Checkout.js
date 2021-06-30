import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (data) => data.trim() === "";

const isFiveChars = (data) => data.trim().length === 5;

const Checkout = (props) => {
  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const [isFormValidity, setIsFormValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const confirmHandler = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const street = streetRef.current.value;
    const postal = postalRef.current.value;
    const city = cityRef.current.value;

    const isNameValid = !isEmpty(name);
    const isStreetValid = !isEmpty(street);
    const isPostalValid = isFiveChars(postal);
    const isCityValid = !isEmpty(city);

    setIsFormValidity({
      name: isNameValid,
      street: isStreetValid,
      postal: isPostalValid,
      city: isCityValid,
    });

    const isFormValid =
      isNameValid && isStreetValid && isPostalValid && isCityValid;

    if (!isFormValid) {
      return;
    }
    console.log(name, " ", street, " ", postal, " ", city);
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameRef} type="text" id="name" />
        {!isFormValidity.name && <p>Please enter correct name</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input ref={streetRef} type="text" id="street" />
        {!isFormValidity.street && <p>Please enter correct street</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalRef} type="text" id="postal" />
        {!isFormValidity.postal && <p>Please enter correct postal code</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input ref={cityRef} type="text" id="city" />
        {!isFormValidity.city && <p>Please enter correct city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
