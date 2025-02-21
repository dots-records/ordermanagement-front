import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './globalComponents/layout/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Orders from './pages/orders/Orders';
import Order from './pages/order_page/Order';
import Releases from './pages/releases/Releases';
import Release from './pages/release_page/Release';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:orderId" element={<Order />} />
          <Route path="releases" element={<Releases />} />
          <Route path="releases/:releaseId" element={<Release />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
