import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/HomePage';
import NavigationBar from './components/NavBar';
import AddProduct from './components/Addproduct';
import ProductDetails from './components/ProductDetail';
import ProductList from './components/ProductList';
import EditProduct from './components/EditProduct';

function App() {

  return (
    <>
      <NavigationBar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/editproduct/:id" element={<EditProduct />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;