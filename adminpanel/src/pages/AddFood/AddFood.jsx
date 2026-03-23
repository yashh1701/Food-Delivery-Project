import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { addFood } from '../../services/foodService';
import { toast } from 'react-toastify';
import { motion } from "framer-motion";
import "./AddFood.css";

const AddFood = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Select Category'
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error('Please select an image.');
      return;
    }

    try {
      await addFood(data, image);
      toast.success('Food added successfully.');

      setData({
        name: '',
        description: '',
        category: 'Biryani',
        price: ''
      });

      setImage(null);
    } catch {
      toast.error('Error adding food.');
    }
  };

  return (
  <div className="addfood-page">

    <motion.form
      onSubmit={onSubmitHandler}
      className="addfood-form"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >

      {/* HEADER */}
      <motion.div 
        className="form-header"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2>Add New Food</h2>
        <p>Fill details to add a new item</p>
      </motion.div>

      {/* IMAGE */}
      <motion.div 
        className="form-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <label>Food Image</label>

        <label htmlFor="image" className="upload-box">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload}
            alt=""
          />
          <span>Click to upload</span>
        </label>

        <input
          type="file"
          id="image"
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
      </motion.div>

      {/* FORM GRID */}
      <div className="form-grid">

        <div className="field full">
          <label>Food Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Chicken Biryani"
            value={data.name}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="field full">
          <label>Description</label>
          <textarea
            name="description"
            rows="3"
            placeholder="Write something delicious..."
            value={data.description}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="field">
          <label>Category</label>
          <select
            name="category"
            value={data.category}
            onChange={onChangeHandler}
          >
            <option>- Select Category -</option>
            <option>Biryani</option>
            <option>Cake</option>
            <option>Burger</option>
            <option>Pizza</option>
            <option>Rolls</option>
            <option>Salad</option>
            <option>Ice cream</option>
          </select>
        </div>

        <div className="field">
          <label>Price (₹)</label>
          <input
            type="number"
            name="price"
            placeholder="200"
            value={data.price}
            onChange={onChangeHandler}
            required
          />
        </div>

      </div>

      {/* ACTION */}
      <div className="form-actions">
        <button type="submit">Save Food Item</button>
      </div>

    </motion.form>
  </div>
);
};

export default AddFood;