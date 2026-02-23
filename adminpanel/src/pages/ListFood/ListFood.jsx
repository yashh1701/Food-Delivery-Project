import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteFood, getFoodList } from "../../services/foodService";

const ListFood = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchList = async () => {
    try {
      setLoading(true);
      const data = await getFoodList();
      setList(data);
    } catch (error) {
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
    } catch (error) {
      toast.error("Error removing food.");
    } finally {
      console.log("Inside delete 1")
      setDeleteId(null);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold mb-0">Food Items</h4>
            <span className="text-muted">{list.length} Items</span>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-warning"></div>
            </div>
          ) : list.length === 0 ? (
            <div className="text-center py-5 text-muted">
              No food items available.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {list.map((item) => (
                    <tr key={item.id} style={{ transition: "0.2s" }}>
                      <td>
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "12px"
                          }}
                        />
                      </td>

                      <td className="fw-semibold">{item.name}</td>

                      <td>
                        <span className="badge bg-light text-dark">
                          {item.category}
                        </span>
                      </td>

                      <td className="fw-bold text-success">
                        ₹{item.price}
                      </td>

                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-outline-danger rounded-pill"
                          onClick={() => confirmDelete(item.id)}
                        >
                          <i className="bi bi-trash me-1"></i>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </div>
      </div>

      {/* Confirm Delete Modal */}
      {deleteId && (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.5)",
          zIndex: 1040
        }}
        onClick={() => setDeleteId(null)}
      ></div>

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1050
        }}
      >
        <div className="card shadow-lg border-0 rounded-4 p-4" style={{ width: "420px" }}>
          <h5 className="fw-bold mb-3 text-center">Confirm Delete</h5>
          <p className="text-muted text-center">
            Are you sure you want to delete this food item?
          </p>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <button
              className="btn btn-light rounded-pill px-4"
              onClick={() => setDeleteId(null)}
            >
              Cancel
            </button>

            <button
              className="btn btn-danger rounded-pill px-4"
              onClick={removeFood}
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </>
  )}

    </div>
  );
};

export default ListFood;