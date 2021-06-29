const Checkout = (props) => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" />
      </div>
      <div>
        <label htmlFor="street">Street</label>
        <input id="street" type="text" />
      </div>
      <div>
        <label htmlFor="postal">Postal Code</label>
        <input id="postal" type="text" />
      </div>
      <div>
        <label htmlFor="city">City</label>
        <input id="city" type="text" />
      </div>
      <button onClick={props.onCancel} type="button">
        Cancel
      </button>
      <button>Confirm</button>
    </form>
  );
};
export default Checkout;
