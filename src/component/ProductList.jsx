import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import SingleProduct from "./SingleProduct";
import "../styles/ProductList.css";
import { LoadingOutlined } from "@ant-design/icons";
import {
  incrementQuantity,
  decrementQuantity,
  addToCart,
} from "../slice/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";

function ProductList({
  searchQuery = "",
  categories = [],
  priceRange = [],
  brands = [],
  rating,
  setCategories,
  setBrand,
}) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [products, setProducts] = useState([]);
  const [notFound, setNotFound] = useState(true);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState({});
  console.log("cartItems", cartItems);
  console.log("Quantity", quantity);

  const handleIncrement = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    console.log("existItem", existingItem);
    if (existingItem) {
      dispatch(incrementQuantity(product.id));
      // setQuantity({ id: existingItem?.id, quan: existingItem?.quantity });
      setQuantity((prevQuantity) => ({
        ...prevQuantity,
        [product.id]: existingItem.quantity + 1,
      }));
    } else {
      dispatch(addToCart(product));
      setQuantity((prevQuantity) => ({
        ...prevQuantity,
        [product.id]: 1,
      }));
    }
    notification.success({
      message: "Product Added",
      description: `${product.title} has been added to your cart.`,
      placement: "bottomRight",
    });
  };

  const handleDecrement = (product) => {
    const decrementItem = cartItems.find((item) => item.id === product.id);
    console.log("decrement", decrementItem);
    if (decrementItem && decrementItem.quantity > 1) {
      dispatch(decrementQuantity(product.id));
      // setQuantity({ id: decrementItem?.id, quan: decrementItem?.quantity });
      setQuantity((prevQuantity) => ({
        ...prevQuantity,
        [product.id]: decrementItem.quantity - 1,
      }));
    } else {
      dispatch(addToCart(product));
    }
    notification.info({
      message: "Product Updated",
      description: `Quantity of ${product.title} has been decreased.`,
      placement: "bottomRight",
    });
  };

  console.log("rating", rating);
  useEffect(() => {
    //fetch products based on the search query
    const fetchProducts = async () => {
      let url = "https://dummyjson.com/products";
      if (searchQuery) url += `/search?q=${searchQuery}`;
      const response = await fetch(url); //Fetch data from the api
      const data = await response.json(); //Convert the response to JSON

      const uniqueCategories = [
        ...new Set(data.products.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);

      const uniqueBrand = [...new Set(data.products.map((prod) => prod.brand))];
      setBrand(uniqueBrand);

      const filteredProducts = data.products.filter((product) => {
        // Ensure each field exists to avoid errors
        const productCategory = product.category || "";
        // const productRating = rating !== null ? rating == Math.floor(product?.rating) : true;
        const productRating = product.rating || 0;
        const productPrice = product.price || 0;
        const productBrand = product.brand || "";

        setNotFound(productRating == false ? false : true);
        // console.log("productRating", productRating);

        const inCategory = categories.length
          ? categories.includes(productCategory)
          : true;

        const inPriceRange =
          productPrice >= priceRange?.min && productPrice <= priceRange?.max;
        // const inPriceRange = productPrice >= priceRange.min && productPrice <= priceRange.max;

        console.log("inPrice", inPriceRange);

        const inBrand = brands.length ? brands.includes(productBrand) : true;

        const meetsRating = rating !== null ? productRating <= rating : true;

        // return inCategory && inPriceRange && inBrand &&  meetsRating ; //productRating;
        return inCategory && inBrand && meetsRating && inPriceRange; //productRating;
      });
      console.log("filterPRoducts", filteredProducts);
      setProducts(filteredProducts); //Store the products in the state
      setNotFound(filteredProducts.length > 0 && true);
      // setNotFound(filteredProducts.length === 0 );
      setLoading(false);
    };
    fetchProducts();
  }, [searchQuery, categories, priceRange, brands, rating]);

  if (loading)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "50px" }}
      >
        <LoadingOutlined style={{ fontSize: "50px" }} />
      </div>
    );

  return (
    <div className="product-list">
      {notFound ? (
        products.map((product) => (
          <div key={product.id} className="product-card">
            <Link
              to={`/product/${product.id}`}
              // key={product.id}
              className="product-card-link"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="product-image"
              />
              <h3>{product.title}</h3>
              <h3>{product.category}</h3>
              <h3>{product.brand}</h3>
              <p>${product.price}</p>
              <p>Rating: {product.rating} ⭐</p>
            </Link>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <button onClick={() => handleDecrement(product)}>-</button>
              <span>
                {cartItems?.find((item) => item?.id === product?.id)
                  ?.quantity ?? 0}
              </span>
              <button onClick={() => handleIncrement(product)}>+</button>
            </div>
          </div>
        ))
      ) : (
        <div
          style={{
            display: "grid",
            margin: "auto",
            justifyContent: "center",
            fontSize: "30px",
            placeItems: "center",
            height: "100vh",
            paddingLeft: "150%",
          }}
        >
          Data Not Found !
        </div>
      )}
    </div>
  );
}
export default ProductList;
