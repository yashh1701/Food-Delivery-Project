import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./FoodItem.css";

const FoodItem = ({ name, description, id, imageUrl, price }) => {
  const { increaseQty, decreaseQty, quantities } = useContext(StoreContext);

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">

      <div className="food-card">

        {/* IMAGE */}
        <Link to={`/food/${id}`} className="food-img-wrapper">
          <img src={imageUrl} alt={name} />
        </Link>

        {/* BODY */}
        <div className="food-card-body">

          <h5 className="food-title">{name}</h5>

          <p className="food-desc">{description}</p>

          <div className="food-meta">

            <span className="food-price">₹{price}</span>

            <div className="food-rating">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-half"></i>
              <span>(4.5)</span>
            </div>

          </div>

        </div>

        {/* FOOTER */}
        <div className="food-card-footer">

          <Link to={`/food/${id}`} className="view-btn">
            View Food
          </Link>

          {quantities[id] > 0 ? (
            <div className="qty-control">

              <button onClick={() => decreaseQty(id)}>
                <i className="bi bi-dash"></i>
              </button>

              <span>{quantities[id]}</span>

              <button onClick={() => increaseQty(id)}>
                <i className="bi bi-plus"></i>
              </button>

            </div>
          ) : (
            <button
              className="add-btn"
              onClick={() => increaseQty(id)}
            >
              <i className="bi bi-cart-plus"></i>
            </button>
          )}

        </div>

      </div>

    </div>
  );
};

export default FoodItem;