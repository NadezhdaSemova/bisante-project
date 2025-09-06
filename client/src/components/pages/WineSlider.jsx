import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/slider.css';
import { API_BASE_URL } from '../../config';

const WineSlider = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${API_BASE_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000, // ⏱️ върти на всеки 10 секунди
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="wine-slider">
      <h2>Нашите вина</h2>
      <Slider {...settings}>
        {products.map(product => (
          <div className="wine-card animated" key={product._id}>
           <img className='product-img' src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price.toFixed(2)} лв. / {(product.price / 1.95583).toFixed(2)} €</p>
            <button className='btn' onClick={() => navigate(`/products/${product._id}`)}>Детайли</button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default WineSlider;
