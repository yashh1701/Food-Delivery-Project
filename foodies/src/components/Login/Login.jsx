import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../service/authService";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const Login = () => {

  const { setToken, loadCartData } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {

      const response = await login(data);

      if (response.status === 200) {

        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);

        await loadCartData(response.data.token);

        navigate("/");

      } else {

        toast.error("Unable to login. Please try again.");

      }

    } catch (error) {

      console.log("Unable to login", error);
      toast.error("Unable to login. Please try again");

    }
  };

  return (

    <div className="login-page">

      {/* LEFT SIDE IMAGE */}

      <div className="login-left">

        <div className="login-overlay">

          <h1>Welcome to FoodHub</h1>

          <p>
            Delicious meals delivered fast to your doorstep.
          </p>

        </div>

      </div>


      {/* RIGHT SIDE LOGIN */}

      <div className="login-right">

        <div className="login-card">

          <h2>Welcome Back</h2>

          <p className="subtitle">
            Sign in to continue ordering delicious food
          </p>

          <form onSubmit={onSubmitHandler}>

            <input
              type="email"
              className="login-input"
              placeholder="Email address"
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              required
            />

            <input
              type="password"
              className="login-input"
              placeholder="Password"
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              required
            />

            <button
              className="login-btn"
              type="submit"
            >
              Login
            </button>

            <button
              className="reset-btn"
              type="reset"
            >
              Reset
            </button>

          </form>

          <div className="login-footer">
            Don't have an account? <Link to="/register">Sign up</Link>
          </div>

        </div>

      </div>

    </div>

  );
};

export default Login;