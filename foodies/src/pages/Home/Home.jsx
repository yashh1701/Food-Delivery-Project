import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import { useState } from 'react';
import './Home.css';

const Home = () => {

  const [category, setCategory] = useState('All');

  return (

    <main className="home-container container">

      {/* HERO HEADER */}
      <section className="home-section fade-up">
        <Header />
      </section>

      {/* PROMOTION BANNER */}
      <section className="promo-banner fade-up delay-1">

        <div className="promo-content">

          <h2>Free Delivery on Orders Above ₹299</h2>

          <p>
            Enjoy delicious meals from your favourite restaurants
            with zero delivery charges today!
          </p>

        </div>

      </section>

      {/* CATEGORY SECTION */}
      <section className="home-section fade-up delay-2">

        <ExploreMenu
          category={category}
          setCategory={setCategory}
        />

      </section>

      {/* FOOD DISPLAY */}
      <section className="home-section fade-up delay-3">

        <div className="food-section-header">

          <h2>Trending Dishes</h2>

          <p>
            Discover the most loved dishes from our menu
          </p>

        </div>

        <FoodDisplay
          category={category}
          searchText={''}
        />  

      </section>

    </main>

  )

}

export default Home;