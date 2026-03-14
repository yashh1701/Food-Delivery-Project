import React, { useRef } from "react";
import { categories } from "../../assets/assets";
import "./ExploreMenu.css";

const ExploreMenu = ({ category, setCategory }) => {

  const menuRef = useRef(null);

  const scrollLeft = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="explore-menu">

      {/* HEADER */}

      <div className="explore-header">

        <div>
          <h1 className="explore-title">Explore Our Menu</h1>
          <p className="explore-subtitle">
            Discover delicious dishes from our curated categories
          </p>
        </div>

        <div className="scroll-controls">

          <button className="scroll-btn" onClick={scrollLeft}>
            <i className="bi bi-arrow-left"></i>
          </button>

          <button className="scroll-btn" onClick={scrollRight}>
            <i className="bi bi-arrow-right"></i>
          </button>

        </div>

      </div>

      {/* CATEGORY SCROLLER */}

      <div className="explore-menu-list" ref={menuRef}>

        {categories.map((item, index) => {

          const isActive = item.category === category;

          return (
            <div
              key={index}
              className="explore-menu-list-item"
              onClick={() =>
                setCategory((prev) =>
                  prev === item.category ? "All" : item.category
                )
              }
            >

              <div className={isActive ? "category-card active" : "category-card"}>

                <img
                  src={item.icon}
                  alt={item.category}
                />

              </div>

              <p className={isActive ? "category-text active-text" : "category-text"}>
                {item.category}
              </p>

            </div>
          );
        })}

      </div>

    </section>
  );
};

export default ExploreMenu;