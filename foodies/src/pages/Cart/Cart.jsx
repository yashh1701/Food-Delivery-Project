import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Cart.css";
import { Link, useNavigate } from "react-router-dom";
import { calculateCartTotals } from "../../util/cartUtils";

const Cart = () => {

  const navigate = useNavigate();

  const { foodList, increaseQty, decreaseQty, quantities, removeFromCart } =
    useContext(StoreContext);

  const cartItems = foodList.filter((food) => quantities[food.id] > 0);

  const { subtotal, shipping, tax, total } =
    calculateCartTotals(cartItems, quantities);

  return (
    <div className="container py-5 cart-page">

      <h1 className="cart-title mb-5">🛒 Your Cart</h1>

      <div className="row">

        {/* LEFT SIDE CART ITEMS */}

        <div className="col-lg-8">

          {cartItems.length === 0 ? (

            <div className="empty-cart text-center">

              <h3>Your cart is empty</h3>

              <p>Looks like you haven't added anything yet.</p>

              <Link to="/" className="btn btn-outline-primary mt-3">
                Browse Food
              </Link>

            </div>

          ) : (

            cartItems.map((food) => (

              <div key={food.id} className="cart-item-card mb-4">

                <div className="row align-items-center">

                  {/* IMAGE */}

                  <div className="col-md-3">

                    <img
                      src={food.imageUrl}
                      alt={food.name}
                      className="cart-food-img"
                    />

                  </div>

                  {/* INFO */}

                  <div className="col-md-5">

                    <h5 className="food-name">{food.name}</h5>

                    <p className="food-category">
                      {food.category}
                    </p>

                  </div>

                  {/* QUANTITY */}

                  <div className="col-md-2">

                    <div className="qty-control">

                      <button
                        onClick={() => decreaseQty(food.id)}
                      >
                        -
                      </button>

                      <span>
                        {quantities[food.id]}
                      </span>

                      <button
                        onClick={() => increaseQty(food.id)}
                      >
                        +
                      </button>

                    </div>

                  </div>

                  {/* PRICE */}

                  <div className="col-md-2 text-end">

                    <p className="item-price">

                      ₹{(food.price * quantities[food.id]).toFixed(2)}

                    </p>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(food.id)}
                    >

                      <i className="bi bi-trash"></i>

                    </button>

                  </div>

                </div>

              </div>

            ))

          )}

          <div className="mt-4">

            <Link to="/" className="continue-btn">

              ← Continue Shopping

            </Link>

          </div>

        </div>


        {/* ORDER SUMMARY */}

        <div className="col-lg-4">

          <div className="order-summary">

            <h5>Order Summary</h5>

            <div className="summary-row">

              <span>Subtotal</span>

              <span>₹{subtotal.toFixed(2)}</span>

            </div>

            <div className="summary-row">

              <span>Shipping</span>

              <span>₹{subtotal === 0 ? 0.0 : shipping.toFixed(2)}</span>

            </div>

            <div className="summary-row">

              <span>Tax</span>

              <span>₹{tax.toFixed(2)}</span>

            </div>

            <hr />

            <div className="summary-row total">

              <span>Total</span>

              <span>

                ₹{subtotal === 0 ? 0.0 : total.toFixed(2)}

              </span>

            </div>

            <button
              className="checkout-btn mt-3"
              disabled={cartItems.length === 0}
              onClick={() => navigate("/order")}
            >

              Proceed to Checkout

            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Cart;