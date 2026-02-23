import React, { useState } from 'react';
import {assets} from '../../assets/assets';
import axios from 'axios';
import { addFood } from '../../services/foodService';
import { toast } from 'react-toastify';

const AddFood = () => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name:'',
        description: '',
        price:'',
        category: 'Biryani'
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name]: value}));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!image) {
            toast.error('Please select an image.');
            return;
        }
        try {
            await addFood(data, image);
            toast.success('Food added successfully.');
            setData({name: '', description: '', category: 'Biryani', price: ''});
            setImage(null);
        } catch (error) {
            toast.error('Error adding food.');
        }
    }
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-lg rounded-4">
            
            <div className="card-body p-5">
              
              <h2 className="fw-bold mb-4 text-center">
                🍽️ Add New Food Item
              </h2>

              <form onSubmit={onSubmitHandler}>

                {/* IMAGE UPLOAD */}
                <div className="mb-4 text-center">
                  <label htmlFor="image" style={{ cursor: "pointer" }}>
                    <div
                      className="rounded-4 border border-2 border-dashed p-4 d-flex flex-column align-items-center justify-content-center"
                      style={{ background: "#f8f9fa" }}
                    >
                      <img
                        src={image ? URL.createObjectURL(image) : assets.upload}
                        alt=""
                        style={{ width: "120px", objectFit: "contain" }}
                      />
                      <p className="mt-3 mb-0 text-muted">
                        Click to upload food image
                      </p>
                    </div>
                  </label>

                  <input
                    type="file"
                    className="form-control d-none"
                    id="image"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

                {/* NAME */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Food Name</label>
                  <input
                    type="text"
                    placeholder="Chicken Biryani"
                    className="form-control form-control-lg rounded-3"
                    required
                    name="name"
                    onChange={onChangeHandler}
                    value={data.name}
                  />
                </div>

                {/* DESCRIPTION */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    className="form-control rounded-3"
                    placeholder="Write delicious description..."
                    rows="4"
                    required
                    name="description"
                    onChange={onChangeHandler}
                    value={data.description}
                  />
                </div>

                {/* CATEGORY & PRICE */}
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-semibold">Category</label>
                    <select
                      name="category"
                      className="form-select rounded-3"
                      onChange={onChangeHandler}
                      value={data.category}
                    >
                      <option value="Biryani">Biryani</option>
                      <option value="Cake">Cake</option>
                      <option value="Burger">Burger</option>
                      <option value="Pizza">Pizza</option>
                      <option value="Rolls">Rolls</option>
                      <option value="Salad">Salad</option>
                      <option value="Ice cream">Ice cream</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-semibold">Price (₹)</label>
                    <input
                      type="number"
                      name="price"
                      placeholder="200"
                      className="form-control rounded-3"
                      onChange={onChangeHandler}
                      value={data.price}
                    />
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="d-grid mt-3">
                  <button
                    type="submit"
                    className="btn btn-dark btn-lg rounded-3"
                  >
                    🚀 Save Food Item
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddFood;