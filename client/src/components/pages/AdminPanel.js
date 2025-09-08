import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/admin.css';
import { API_BASE_URL } from '../../config';

const AdminPanel = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('addProduct');
  const [orders, setOrders] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [archivedOrders, setArchivedOrders] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchDate, setSearchDate] = useState('');



  // ⭐ За добавяне на продукт
  const [product, setProduct] = useState({
    name: '',
    year: '',
    price: '',
    description: '',
    image: ''
  });

  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });

      const data = await res.json();
      if (res.ok) {
        alert('Продуктът е добавен успешно!');
        setProduct({ name: '', year: '', price: '', description: '', image: '' });
      } else {
        alert(data.error || 'Грешка при добавяне');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Функция за PATCH продукт
  const updateProduct = async (id, updatedFields) => {
    try {
      console.log("📤 PATCH към API:", `${API_BASE_URL}/api/products/${id}`);
      console.log("📦 Тяло:", updatedFields);

      const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Грешка при редакция");
      }

      const data = await res.json();
      fetchProducts(); // презареждане на списъка
      setEditingProduct(null);
      return data;
    } catch (err) {
      console.error("❌ Грешка при редакция:", err.message);
      alert("Неуспешна редакция!");
    }
  };


  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Грешка при зареждане на продуктите:', err);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Сигурни ли сте, че искате да изтриете това вино?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProducts(prev => prev.filter(p => p._id !== id));
      }
    } catch (err) {
      console.error('Грешка при изтриване на виното:', err);
    }
  };

  const updateOrder = async (id, updateData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      if (res.ok) {
        setOrders(prev =>
          prev.map(order => order._id === id ? { ...order, ...updateData } : order)
        );
      }
    } catch (err) {
      console.error('Грешка при обновяване на поръчката:', err);
    }
  };

  const completeOrder = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders/${id}/complete`, {
        method: 'PATCH',
      });

      if (res.ok) {
        await fetchOrders(); // <-- презареди списъците
      }
    } catch (err) {
      console.error('Грешка при завършване на поръчката:', err);
    }
  };

  const uncompleteOrder = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCompleted: false }),
      });

      if (res.ok) {
        await fetchOrders();
        setActiveTab('orders'); // 👉 автоматично връщане към активни
      }
    } catch (err) {
      console.error('Грешка при връщане на поръчката:', err);
    }
  };


  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders`);
      const data = await res.json();
      setOrders(data.filter(order => !order.isCompleted));
      setArchivedOrders(data.filter(order => order.isCompleted));
    } catch (err) {
      console.error('Грешка при презареждане на поръчките:', err);
    }
  };


  useEffect(() => {
    if (!admin) {
      navigate('/admin-login');
    }
  }, [admin, navigate]);

  useEffect(() => {
    if (activeTab === 'orders' || activeTab === 'archive') {
      fetchOrders();
    }
    if (activeTab === 'productsList') {
      fetchProducts();
    }
  }, [activeTab]);


  if (!admin) {
    return null; // изчакай пренасочването
  }


  return (
    <div className="admin-dashboard">
      <h2>Административен Панел</h2>
      <div className="admin-nav">
        <button className={`nav-button ${activeTab === 'addProduct' ? 'active-tab' : ''}`} onClick={() => setActiveTab('addProduct')}>➕ Добави вино</button>
        <button className={`nav-button ${activeTab === 'productsList' ? 'active-tab' : ''}`} onClick={() => setActiveTab('productsList')}>🍷 Всички вина</button>
        <button className={`nav-button ${activeTab === 'orders' ? 'active-tab' : ''}`} onClick={() => setActiveTab('orders')}>📬 Получени заявки</button>
        <button className={`nav-button ${activeTab === 'archive' ? 'active-tab' : ''}`} onClick={() => setActiveTab('archive')}>📁 Архив</button>
        <button className="nav-button" onClick={logout}>🚪 Изход</button>
      </div>


      <div className="admin-content">
        {activeTab === 'addProduct' && (
          <form onSubmit={handleAdd} className="admin-form">
            <h3>Добавяне на ново вино</h3>
            <input type="text" name="name" placeholder="Име" value={product.name} onChange={handleChange} required />
            <input type="text" name="year" placeholder="Година" value={product.year} onChange={handleChange} required />

            <input type="number" name="price" placeholder="Цена" value={product.price} onChange={handleChange} required />
            <textarea name="description" placeholder="Описание" value={product.description} onChange={handleChange} required />
            <input type="text" name="image" placeholder="URL на изображение" value={product.image} onChange={handleChange} required />
            <button type="submit">Добави</button>
          </form>
        )}

        {activeTab === 'productsList' && (
          <div>
            <h3>🍷 Списък с всички вина</h3>
            {products.length === 0 ? (
              <p>Няма добавени вина.</p>
            ) : (
              <ul className="products-list">
                {products.map(p => (
                  <li key={p._id} className="product-item card">
                    {editingProduct?._id === p._id ? (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const { _id, ...cleanProduct } = editingProduct;
                          updateProduct(_id, cleanProduct);
                        }}
                      >
                        <input
                          type="text"
                          value={editingProduct.name}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, name: e.target.value })
                          }
                          required
                        />
                        <input
                          type="number"
                          value={editingProduct.year}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, year: Number(e.target.value) })
                          }
                          required
                        />
                        <input
                          type="number"
                          value={editingProduct.price}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, price: Number(e.target.value) })
                          }
                          required
                        />
                        <textarea
                          value={editingProduct.description}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              description: e.target.value,
                            })
                          }
                          required
                        />
                        <input
                          type="text"
                          value={editingProduct.image}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, image: e.target.value })
                          }
                          required
                        />
                        <button type="submit">💾 Запази</button>
                        <button type="button" onClick={() => setEditingProduct(null)}>
                          ❌ Отказ
                        </button>
                      </form>
                    ) : (
                      <>
                        <img src={p.image} alt={p.name} style={{ width: '100px' }} />
                        <div>
                          <h4>{p.name}</h4>
                          <p>{p.price} лв.</p>
                        </div>
                        <button onClick={() => setEditingProduct(p)}>✏️ Редактирай</button>
                        <button onClick={() => deleteProduct(p._id)}>❌ Изтрий</button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}


        <ul className="orders-list">
          {orders.map(order => (
            <li key={order._id} className="order-item card">
              <div className="card-header">{order.customerName}</div>
              <div className="card-body">
                <p><strong>Имейл:</strong> {order.customerEmail}</p>
                <p><strong>Телефон:</strong> {order.customerPhone}</p>
                <p><strong>Адрес:</strong> {order.customerAddress}</p>
                <p><strong>Дата на поръчка:</strong> {new Date(order.createdAt).toLocaleString()}</p>

                <ul>
                  <p><strong>Поръчани вина</strong></p>
                  {order.items.map((item, idx) => (

                    <li key={idx}>
                      {item.name} – {item.quantity} бр. @ {item.price.toFixed(2)} лв. / {(item.price * 1.95583).toFixed(2)}€
                    </li>
                  ))}
                </ul>

                <p><strong>Общо:</strong> {order.items.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)} лв. / {(order.items.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2) * 1.95583)} € </p>

                <div className="badges">
                  <span className={`badge ${order.isShipped ? 'badge-success' : 'badge-danger'}`}>
                    📦 {order.isShipped ? 'Изпратена' : 'Неизпратена'}
                  </span>
                  <span className={`badge ${order.isPaid ? 'badge-success' : 'badge-danger'}`}>
                    💳 {order.isPaid ? 'Платена' : 'Неплатена'}
                  </span>
                </div>

                <label>
                  <input
                    type="checkbox"
                    checked={order.isShipped}
                    onChange={() => updateOrder(order._id, { isShipped: !order.isShipped })}
                  />
                  Обнови статус: Изпратена
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={order.isPaid}
                    onChange={() => updateOrder(order._id, { isPaid: !order.isPaid })}
                  />
                  Обнови статус: Платена
                </label>

                <button
                  onClick={() => completeOrder(order._id)}
                  disabled={!order.isShipped || !order.isPaid}
                >
                  Завърши поръчката
                </button>
              </div>
            </li>
          ))}
        </ul>


        {activeTab === 'archive' && (
          <div>
            <h3>📁 Архив на поръчки</h3>

            <div className="archive-filters">
              <input
                type="text"
                placeholder="Търси по име"
                value={searchName}
                onChange={e => setSearchName(e.target.value)}
              />
              <input
                type="date"
                value={searchDate}
                onChange={e => setSearchDate(e.target.value)}
              />
            </div>

            {archivedOrders.length === 0 ? (
              <p>Няма завършени поръчки.</p>
            ) : (
              <ul className="orders-list">
                {archivedOrders
                  .filter(order =>
                    (!searchName || order.customerName.toLowerCase().includes(searchName.toLowerCase())) &&
                    (!searchDate || new Date(order.createdAt).toISOString().slice(0, 10) === searchDate)
                  )
                  .map(order => (
                    <li key={order._id} className="order-item card card-body">
                      <p><strong>Име:</strong> {order.customerName}</p>
                      <p><strong>Имейл:</strong> {order.customerEmail}</p>
                      <p><strong>Телефон:</strong> {order.customerPhone}</p>
                      <p><strong>Адрес:</strong> {order.customerAddress}</p>
                      <p><strong>Дата:</strong> {new Date(order.createdAt).toLocaleString()}</p>

                      <ul>
                        {order.items.map((item, idx) => (
                          <li key={idx}>
                            {item.name} – {item.quantity} бр. @ {item.price.toFixed(2)} лв. / {(item.price * 1.95583).toFixed(2)}€
                          </li>
                        ))}
                      </ul>

                      <p><strong>Общо:</strong> {order.items.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)} лв.</p>
                      <p>✅ Изпратена: {order.isShipped ? 'Да' : 'Не'} | 💳 Платена: {order.isPaid ? 'Да' : 'Не'}</p>
                      <button onClick={() => uncompleteOrder(order._id)}>Върни в активни</button>
                    </li>
                  ))}

              </ul>
            )}


          </div>
        )}

      </div>
    </div>
  );
};

export default AdminPanel;
