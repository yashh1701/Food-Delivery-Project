import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../service/authService";

const Register = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
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

      const response = await registerUser(data);

      if (response.status === 201) {

        toast.success("Registration completed. Please login.");
        navigate("/login");

      } else {

        toast.error("Unable to register. Please try again");

      }

    } catch (error) {

      toast.error("Unable to register. Please try again");

    }
  };

  return (

    <div className="register-page">

      {/* LEFT SIDE REGISTER FORM */}

      <div className="register-left">

        <div className="register-card">

          <h2>Create Account</h2>

          <p className="subtitle">
            Start ordering your favorite food today
          </p>

          <form onSubmit={onSubmitHandler}>

            <input
              type="text"
              className="register-input"
              placeholder="Full Name"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              required
            />

            <input
              type="email"
              className="register-input"
              placeholder="Email Address"
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              required
            />

            <input
              type="password"
              className="register-input"
              placeholder="Password"
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              required
            />

            <button
              className="register-btn"
              type="submit"
            >
              Create Account
            </button>

            <button
              className="reset-btn"
              type="reset"
            >
              Reset
            </button>

          </form>

          <div className="register-footer">
            Already have an account? <Link to="/login">Login</Link>
          </div>

        </div>

      </div>


      {/* RIGHT SIDE IMAGE */}

      <div className="register-right">

        <div className="register-overlay">

          <h1>Join FoodHub</h1>

          <p>
            Discover delicious meals and get them delivered fast.
          </p>

        </div>

      </div>

    </div>

  );
};

export default Register;