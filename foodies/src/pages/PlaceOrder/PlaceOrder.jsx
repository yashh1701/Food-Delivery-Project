import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { calculateCartTotals } from "../../util/cartUtils";
import { toast } from "react-toastify";
import { RAZORPAY_KEY } from "../../util/contants";
import { useNavigate } from "react-router-dom";
import {
  createOrder,
  deleteOrder,
  verifyPayment,
} from "../../service/orderService";
import { clearCartItems } from "../../service/cartService";

const PlaceOrder = () => {
  const { foodList, quantities, setQuantities, token } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    state: "",
    city: "",
    zip: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const cartItems = foodList.filter((food) => quantities[food.id] > 0);

  const { subtotal, shipping, tax, total } = calculateCartTotals(
    cartItems,
    quantities
  );

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const orderData = {
      userAddress: `${data.firstName} ${data.lastName}, ${data.address}, ${data.city}, ${data.state}, ${data.zip}`,
      phoneNumber: data.phoneNumber,
      email: data.email,
      orderedItems: cartItems.map((item) => ({
        foodId: item.foodId,
        quantity: quantities[item.id],
        price: item.price * quantities[item.id],
        category: item.category,
        imageUrl: item.imageUrl,
        description: item.description,
        name: item.name,
      })),
      amount: total.toFixed(2),
      orderStatus: "Preparing",
    };

    try {
      const response = await createOrder(orderData, token);
      if (response.razorpayOrderId) {
        initiateRazorpayPayment(response);
      } else {
        toast.error("Unable to place order.");
      }
    } catch {
      toast.error("Unable to place order.");
    }
  };

  const initiateRazorpayPayment = (order) => {
    const options = {
      key: RAZORPAY_KEY,
      amount: order.amount,
      currency: "INR",
      name: "FoodHub",
      description: "Food Order",
      order_id: order.razorpayOrderId,
      handler: verifyPaymentHandler,
      prefill: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        contact: data.phoneNumber,
      },
      theme: { color: "#ff5a1f" },
      modal: { ondismiss: deleteOrderHandler },
    };

    new window.Razorpay(options).open();
  };

  const verifyPaymentHandler = async (res) => {
    const paymentData = {
      razorpay_payment_id: res.razorpay_payment_id,
      razorpay_order_id: res.razorpay_order_id,
      razorpay_signature: res.razorpay_signature,
    };

    try {
      const success = await verifyPayment(paymentData, token);
      if (success) {
        toast.success("Payment successful");
        await clearCartItems(token, setQuantities);
        navigate("/myorders");
      } else {
        toast.error("Payment failed");
      }
    } catch {
      toast.error("Payment failed");
    }
  };

  const deleteOrderHandler = async (id) => {
    try {
      await deleteOrder(id, token);
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="placeorder-section">
      <div className="container">

        {/* HEADER */}
        <div className="text-center mb-4">
          <h2 className="placeorder-title">Checkout</h2>
          <p className="placeorder-subtitle">
            Complete your order and enjoy your meal 🍽️
          </p>
        </div>

        <div className="row g-4">

          {/* BILLING FORM */}
          <div className="col-lg-7">
            <div className="order-card">
              <h4 className="mb-3">Billing Details</h4>

              <form onSubmit={onSubmitHandler}>
                <div className="row g-3">

                  <div className="col-md-6">
                    <input className="form-input" placeholder="First Name" name="firstName" value={data.firstName} onChange={onChangeHandler} required />
                  </div>

                  <div className="col-md-6">
                    <input className="form-input" placeholder="Last Name" name="lastName" value={data.lastName} onChange={onChangeHandler} required />
                  </div>

                  <div className="col-12">
                    <input className="form-input" placeholder="Email" name="email" value={data.email} onChange={onChangeHandler} required />
                  </div>

                  <div className="col-12">
                    <input className="form-input" placeholder="Phone Number" name="phoneNumber" value={data.phoneNumber} onChange={onChangeHandler} required />
                  </div>

                  <div className="col-12">
                    <input className="form-input" placeholder="Address" name="address" value={data.address} onChange={onChangeHandler} required />
                  </div>

                  <div className="col-md-4">
                    <input className="form-input" placeholder="State" name="state" value={data.state} onChange={onChangeHandler} required />
                  </div>

                  <div className="col-md-4">
                    <input className="form-input" placeholder="City" name="city" value={data.city} onChange={onChangeHandler} required />
                  </div>

                  <div className="col-md-4">
                    <input className="form-input" placeholder="Zip" name="zip" value={data.zip} onChange={onChangeHandler} required />
                  </div>

                </div>

                <button
                  className="checkout-btn mt-4"
                  type="submit"
                  disabled={cartItems.length === 0}
                >
                  Proceed to Payment
                </button>
              </form>
            </div>
          </div>

          {/* CART SUMMARY */}
          <div className="col-lg-5">
            <div className="order-card sticky-card">
              <h4 className="mb-3">Order Summary</h4>

              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <span>{item.name} × {quantities[item.id]}</span>
                  <span>₹{item.price * quantities[item.id]}</span>
                </div>
              ))}

              <hr />

              <div className="summary-item">
                <span>Shipping</span>
                <span>₹{shipping.toFixed(2)}</span>
              </div>

              <div className="summary-item">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
  
export default PlaceOrder;