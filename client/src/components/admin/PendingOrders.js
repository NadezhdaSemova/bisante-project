import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config';

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/orders`)
      .then(res => res.json())
      .then(data => {
        const pending = data.filter(order => !order.isCompleted);
        setOrders(pending);
      })
      .catch(err => console.error('Грешка при зареждане на поръчки:', err));
  }, []);

  const updateOrder = async (id, field) => {
    try {
      await fetch(`${API_BASE_URL}/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: true }),
      });

      setOrders(prev =>
        prev.map(order =>
          order._id === id ? { ...order, [field]: true } : order
        )
      );
    } catch (err) {
      console.error('Грешка при обновяване:', err);
    }
  };

  const completeOrder = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/api/orders/${id}/complete`, {
        method: 'PATCH',
      });
      setOrders(prev => prev.filter(order => order._id !== id));
    } catch (err) {
      console.error('Грешка при завършване:', err);
    }
  };

  return (
    <div>
      <h3>Получени заявки</h3>
      {orders.length === 0 ? (
        <p>Няма активни поръчки.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Клиент</th>
              <th>Имейл</th>
              <th>Телефон</th>
              <th>Адрес</th>
              <th>Дата</th>
              <th>Сума</th>
              <th>Изпратена</th>
              <th>Платена</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order.customerName}</td>
                <td>{order.customerEmail}</td>
                <td>{order.customerPhone}</td>
                <td>{order.customerAddress}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  {order.items
                    .reduce((sum, item) => sum + item.price * item.quantity, 0)
                    .toFixed(2)} лв.
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={order.isShipped}
                    onChange={() => updateOrder(order._id, 'isShipped')}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={order.isPaid}
                    onChange={() => updateOrder(order._id, 'isPaid')}
                  />
                </td>
                <td>
                  <button onClick={() => completeOrder(order._id)}>
                    Завърши поръчка
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingOrders;
