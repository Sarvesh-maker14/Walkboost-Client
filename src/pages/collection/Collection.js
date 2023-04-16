import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Products from "../../components/products/Product";
import "./Collection.scss";
import { axiosClient } from "../../utils/axiosClient";

const Collection = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categoryId, setCategoryId] = useState("");
  const categories = useSelector((state) => state.categoryReducer.categories);
  const [products, setProducts] = useState([]);

  const sortOptions = [
    {
      value: "Price - Low To High",
      sort: "price",
    },
    {
      value: "Newest First",
      sort: "createdAt",
    },
  ];

  const [sortBy, setSortBy] = useState(sortOptions[0].sort);

  async function fetchProducts() {
    // const response = axiosClient.get("/products");
    const url = params.categoryId
      ? `/products?populate=image&filters[category][key][$eq]=${params.categoryId}&sort=${sortBy}`
      : `/products?populate=image&sort=${sortBy}`;
    const response = await axiosClient.get(url);
    setProducts(response.data.data);
  }

  useEffect(() => {
    setCategoryId(params.categoryId);
    fetchProducts();
  }, [params, sortBy]);

  function updateCategory(e) {
    navigate(`/category/${e.target.value}`);
  }

  return (
    <div className="Categories">
      <div className="container">
        <div className="header">
          <div className="info">
            <h2>Explore All prints and Artwork</h2>
            <p>This our premium work</p>
          </div>
          <div className="sort-by">
            <div className="sort-by-container">
              <p className="sort-by-text">Sort By</p>
              <select
                className="sort-by-select"
                name="sort-by"
                id="sort-by"
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map((item) => (
                  <option key={item.sort} value={item.sort}>
                    {item.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="filter-box">
            <div className="category-filter">
              <h3>Category</h3>
              {categories.map((item) => (
                <div key={item.id} className="filter-radio">
                  <input
                    name="category"
                    type="radio"
                    id={item.id}
                    onChange={updateCategory}
                    value={item.attributes.key}
                    checked={item.attributes.key === categoryId}
                  />
                  <label htmlFor={item.id} className="">
                    {item.attributes.title}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="product-box">
            {products.map((product) => (
              <Products key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
