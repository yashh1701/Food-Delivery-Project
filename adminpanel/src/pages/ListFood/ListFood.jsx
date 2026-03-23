import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteFood, getFoodList } from "../../services/foodService";
import { motion } from "framer-motion";
import "./ListFood.css";

const ListFood = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchList = async () => {
    try {
      setLoading(true);
      const data = await getFoodList();
      setList(data);
    } catch {
      toast.error("Error while reading the foods.");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
  };

  const removeFood = async () => {
    try {
      const success = await deleteFood(deleteId);
      if (success) {
        toast.success("Food removed successfully.");
        setList(prev => prev.filter(item => item.id !== deleteId));
      } else {
        toast.error("Error removing food.");
      }
    } catch {
      toast.error("Error removing food.");
    } finally {
      setDeleteId(null);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="listfood-wrapper">

      {/* HEADER */}
      <div className="listfood-header">
        <div>
          <h2>Food Items</h2>
          <p>Manage all your available food items</p>
        </div>
        <span className="count">{list.length} Items</span>
      </div>

      {/* CONTENT */}
      <motion.div
        className="listfood-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >

        {loading ? (
          <div className="loader">
            <div className="spinner"></div>
          </div>
        ) : list.length === 0 ? (
          <div className="empty">No food items available.</div>
        ) : (
          <>
            {/* DESKTOP TABLE */}
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {list.map((item) => (
                    <tr key={item.id}>
                      <td className="item-cell">
                        <img src={item.imageUrl} alt="" />
                        <span>{item.name}</span>
                      </td>

                      <td>
                        <span className="badge">{item.category}</span>
                      </td>

                      <td className="price">₹{item.price}</td>

                      <td className="action">
                        <button onClick={() => confirmDelete(item.id)}>
                          <i className="bi bi-trash"></i>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="mobile-list">
              {list.map((item) => (
                <div className="mobile-card" key={item.id}>
                  <div className="top">
                    <img src={item.imageUrl} alt="" />
                    <div>
                      <h4>{item.name}</h4>
                      <span>{item.category}</span>
                    </div>
                  </div>

                  <div className="bottom">
                    <span className="price">₹{item.price}</span>
                    <button onClick={() => confirmDelete(item.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </motion.div>

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h4>Confirm Delete</h4>
            <p>Are you sure you want to delete this item?</p>

            <div className="modal-actions">
              <button className="cancel" onClick={() => setDeleteId(null)}>
                Cancel
              </button>
              <button className="delete" onClick={removeFood}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ListFood;