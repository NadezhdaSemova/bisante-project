
// import React, { useEffect, useState } from 'react';
import '../../styles/home.css';
import { Link } from 'react-router-dom';
import WineSlider from './WineSlider';
import '../../styles/productCard.css'


function Home() {
 

  return (
    <div className="home-layout">
      {/* Лява част: снимка */}
      <div className="left-image">
        <img src="/472161855_122180797958088399_6609343921021581202_n.png" alt="wine" />
      </div>

      {/* Дясна част: съдържание */}
      <div className="right-content">
        <section className="intro">
          <h1>Добре дошли във <span className="highlight">Винарна Бисанте</span></h1>

          <Link to="/products" className="btn">Разгледай продукти</Link>
        </section>

        <div>
          {/* Други секции */}
          <WineSlider />
        </div>
      </div>
    </div>
  );
}

export default Home;
