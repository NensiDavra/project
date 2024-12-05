// import React from 'react';
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
// import Login from './CartPage';
import "../styles/Header.css";
import { useSelector } from "react-redux";
function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.length; //only product are count not quantity

  // add to the quantity in the header shopping cart
  // const totalQuntity= cartItems.reduce(
  //   (total, item) => total + item.quantity,0
  // );

  return (
    <header className="header">
      <h1>E-Commerce</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/reseller">Reseller Program</Link>
        <Link to="/download">Download</Link>
        <Link to="/contact">Contact</Link>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {/* <Link to="/cart"><ShoppingCartOutlined /></Link> */}
          <Link to="/cart">
            <ShoppingCartOutlined style={{ fontSize: "20px" }} />
            <span style={{ verticalAlign: "super", fontSize: "15px" }}>
              ({totalQuantity})
            </span>
          </Link>

          <Link to="/login">Login</Link>
        </div>
      </nav>
    </header>
  );
}
export default Header;
