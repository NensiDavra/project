import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams(); //Get Product Id
  const [product, setProduct] = useState(null);

  useEffect(() => {
    //fetch the single product using id
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => console.error("Error Fetching product:", error));
  }, [id]);
  if (!product) return <div>Loading....</div>;

  return (
    <div style={{padding:'20px'}}>
      <h1>{product.title}</h1>
      <img src={product.thumbnail} alt={product.title} style={{width:'300px',borderRadius:'8px'}}/>
      <p><strong>Price: </strong>${product.price}</p>
      <p><strong>Rating: </strong>{product.rating}⭐</p>
      <p><strong>Description: </strong>{product.description}</p>
      <p><strong>Category: </strong>{product.category}</p>
    </div>
  );
}

export default ProductDetail;
