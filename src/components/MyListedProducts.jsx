import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyListedProducts.css"; // Import the CSS file

const MyListedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("auth_token");

        if (!token) {
          setError("Authorization token not found. Please log in.");
          setLoading(false);
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get("http://localhost:8080/user", { headers });
        setProducts(response.data);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Could not fetch your listed products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      setError("Authorization token not found. Please log in.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.delete(`http://localhost:8080/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 204) {
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
          );
          alert("Product deleted successfully!");
        } else {
          setError("Failed to delete the product. Please try again.");
        }
      } catch (err) {
        console.error("Error deleting product:", err);
        setError("Could not delete the product. Please try again.");
      }
    }
  };

  return (
    <div className="my-listed-products">
      <h2 className="title">My Listed Products</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && products.length === 0 && <p>No products found.</p>}
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <div className="product-card">
              <div className="product-left">
                <img src={product.image || 'default.jpg'} alt={product.productName} className="product-image" />
              </div>
              <div className="product-details">
                <h3>{product.productName}</h3>
                <p className="description">{product.description}</p>
                <p className="category">Category: {product.category}</p>
                <p className="price">Price: ${product.price.toFixed(2)}</p>
              </div>
              <div className="product-actions">
                <button className="btn-update">Update</button>
                <button onClick={() => handleDelete(product.id)} className="btn-delete">Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyListedProducts;
