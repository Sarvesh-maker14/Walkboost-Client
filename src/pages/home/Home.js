import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Category from "../../components/category/Category";
import Hero from "../../components/hero/Hero";
import Products from "../../components/products/Product";
import { axiosClient } from "../../utils/axiosClient";
import "./Home.scss";

const Home = () => {
  const [topProducts, setTopProducts] = useState(null);
  const categories = useSelector((state) => state.categoryReducer.categories);

  async function fetchData() {
    // const categoryResponse = await axiosClient.get(
    //   "/categories?populate=image"
    // );
    const topProductsResponse = await axiosClient.get(
      "/products?filters[isTopPick]=true&populate=image"
    );

    // console.log(categoryResponse);
    // console.log(topProductsResponse);

    // setCategories(categoryResponse.data.data);
    setTopProducts(topProductsResponse.data.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Home">
      <Hero />
      <section className="collections container">
        <div className="info">
          <h2 className="heading">Shop By Categories</h2>
          <p className="subheading">
            Shop from the best, our Designer Sneakers and Canvas Sneakers
            Collection
          </p>
        </div>
        <div className="content">
          {categories?.map((category) => (
            <Category key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="collections container">
        <div className="info">
          <h2 className="heading">Our Top Picks</h2>
          <p className="subheading">New Launches</p>
        </div>
        <div className="content">
          {topProducts?.map((product) => (
            <Products key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
