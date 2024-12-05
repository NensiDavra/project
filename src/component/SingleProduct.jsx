import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/SingleProduct.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../slice/CartSlice";
import {LoadingOutlined} from "@ant-design/icons";

function SingleProduct() {
  const { productId } = useParams(); // Extract productId from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data);
        console.log("You are selected this product:",data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  // const handleAddToCart=()=>{
  //   navigate(`/login`);
  // };
  const handleAddToCart=()=>{
    dispatch(addToCart(product)); //Dispatch add to cart action with product details
    navigate(`/cart`);
  };

  if (loading) return <LoadingOutlined style={{fontSize:"50px"}}/>//<p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="single-product">
      <div className="product-images">
        <img src={product.thumbnail} alt={product.title} className="main-image" />
        <div className="thumbnail-list">
          {product.images.map((image, index) => (
            <img key={index} src={image} alt={`${product.title} ${index}`} className="thumbnail" />
          ))}
        </div>
      </div>
      <div className="product-details">
        <h2>{product.title}</h2>
        <p><strong>Brand: </strong> {product.brand}</p>
        <p><strong>Price: </strong> ${product.price}</p>
        <p><strong>Discount: </strong> {product.discountPercentage}% OFF</p>
        <p><strong>Rating: </strong> {product.rating} ⭐</p>
        {/* <p><strong>width:{product.dimensions.width}</strong></p> */}
        <p><strong>Brand: </strong>{product.brand}</p>
        <p>{product.description}</p>
        <p><strong>Warranty: </strong> {product.warrantyInformation}</p>
        {/* <p><strong>Review: </strong> {product.meta}</p> */}
        <div className="purchase-options">
          <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
          <button className="buy-now" >Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;






