// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
// import Filters from "./component/Filters";
// import ProductList from "./component/ProductList";
import Home from "./pages/Home";
import Shop from './pages/Shop';
import ResellerProgram from './pages/ResellerProgram';
import Download  from './pages/Download';
import Contact from './pages/Contact';
// import ProductDetail from "./pages/ProductDetail";
import SingleProduct from "./component/SingleProduct";
import Login from "./component/Login";
// import AddToCart from "./component/AddToCart";
import Cart from "./component/Cart";
import './App.css';
function App(){
  return(
    <Router>
      <div className="App">
        <Header/>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/shop" element={<Shop/>}/>
            {/* <Route path="/product/:id" element={<ProductDetail/>}/> */}
            <Route path="/product/:productId" element={<SingleProduct/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/login" element={<Login/>}></Route>
            {/* <Route path="/cart" element={<AddToCart/>}></Route> */}

            <Route path="/reseller" element={<ResellerProgram/>}/>
            <Route path="/download" element={<Download/>}/>
            <Route path="/contact" element={<Contact/>}/>
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}
export default App;


