import React, { useRef } from "react";
import { categories } from "../../assets/assets";
import "./ExploreMenu.css";

const ExploreMenu = ({ category, setCategory }) => {
  const menuRef = useRef(null);

  const scrollLeft = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: -300, behavior: "smooth"  });
    }
  };

  const scrollRight = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: 300, behavior: "smooth"  });
    }
  };

  return (
    <div className="explore-menu position-relative">

      <div className="explore-header">
        <h1 className="explore-title">Explore Our Menu</h1>

        <div className="scroll-controls">
          <i
            className="bi bi-arrow-left-circle scroll-icon"
            onClick={scrollLeft}
          ></i>
          <i
            className="bi bi-arrow-right-circle scroll-icon"
            onClick={scrollRight}
          ></i>
        </div>
      </div>

      <p className="explore-subtitle">
        Explore curated lists of dishes from top categories
      </p>

      <div
        className="explore-menu-list"
        ref={menuRef}
      >
        {categories.map((item, index) => {
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

              <div
                className={
                  item.category === category
                    ? "category-card active"
                    : "category-card"
                }
              >
                <img
                  src={item.icon}
                  alt={item.category}
                />
              </div>

              <p
                className={
                  item.category === category
                    ? "category-text text-active"
                    : "category-text"
                }
              >
                {item.category}
              </p>

            </div>
          );
        })}
      </div>

      <hr />

    </div>
  );
};

export default ExploreMenu;