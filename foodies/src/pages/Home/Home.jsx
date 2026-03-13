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
      <section className="home-section header-section fade-up">
        <Header />
      </section>

      {/* CATEGORY MENU */}
      <section className="home-section explore-section fade-up delay-1">
        <ExploreMenu
          category={category}
          setCategory={setCategory}
        />
      </section>

      {/* FOOD DISPLAY */}
      <section className="home-section food-section fade-up delay-2">
        <FoodDisplay
          category={category}
          searchText={''}
        />
      </section>

    </main>

  );

}

export default Home;