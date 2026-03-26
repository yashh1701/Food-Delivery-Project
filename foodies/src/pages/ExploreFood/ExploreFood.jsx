import React, { useState } from 'react';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import './ExploreFood.css';

const ExploreFood = () => {

  const [category, setCategory] = useState('All');
  const [searchText, setSearchText] = useState('');

  return (
    <section className="explore-section">

      {/* HEADER */}
      <div className="explore-container">

        {/* SEARCH */}
        <form 
          className="explore-search"
          onSubmit={(e) => e.preventDefault()}
        >

          <select 
            className="custom-input"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Biryani">Biryani</option>
            <option value="Burger">Burger</option>
            <option value="Cake">Cakes</option>
            <option value="Ice cream">Ice Creams</option>
            <option value="Pizza">Pizza</option>
            <option value="Rolls">Rolls</option>
            <option value="Salad">Salad</option>
          </select>

          <input 
            type="text"
            className="custom-input flex-grow"
            placeholder="Search your favorite dish..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button className="search-btn">
            <i className="bi bi-search"></i>
          </button>

        </form>

        {/* EXPLORE HEADINGS */}
        <div className="explore-header">
          <h1>Explore Delicious Food</h1>
          <p>Find your favorite dishes from our wide range of menu</p>
        </div>

      </div>

      {/* FOOD SECTION */}
      <div className="explore-container">
        <FoodDisplay category={category} searchText={searchText} />
      </div>

    </section>
  );
};

export default ExploreFood; 