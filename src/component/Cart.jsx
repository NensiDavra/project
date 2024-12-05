import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Image, notification } from "antd";
import {
  clearCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  selectSubtotal,
} from "../slice/CartSlice";
import "../styles/Cart.css";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const subtotal = useSelector(selectSubtotal); // Get subtotal from selector988
  const dispatch = useDispatch();

  const handleIncrement=(id)=>{
    dispatch(incrementQuantity(id));
    notification.success({
      message:"Item is updated Successfully",
      placement:"bottomRight",
    })
  };

  const handleDecrement=(id)=>{
    dispatch(decrementQuantity(id));
    notification.success({
      message:"Item is updated",
      placement:"bottomRight",
    })
  };

  const handleRemove=(record)=>{
  dispatch(removeFromCart(record));
  notification.info({
    message:"Item Removed",
    description: `${record.title} has been removed from your cart.`,
    placement: "topRight",
  });
};

const handleClearCart=(record)=>{
  dispatch(clearCart(record));
  notification.warning({
    message:"Cart Cleared",
    description: "All items have been removed from your cart.",
    placement:"topRight",
  })
}
  
  const columns = [
    {
      title: <h2>Item Image</h2>,
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (text, record) => (
        <Image src={record.thumbnail} alt={record.title} width={80} height={80} />
      ),
    },
    {
      title: <h2>Title</h2>,
      dataIndex: "title",
      key: "title",
      render: (text) => <h3>{text}</h3>,
    },
    {
      title: <h2>Price</h2>,
      dataIndex: "price",
      key: "price",
      render: (price) => <p>${price}</p>,
    },
    {
      title: <h2>Quantity</h2>,
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          {/* <Button onClick={() => dispatch(decrementQuantity(record.id))}>-</Button>
          <span>{quantity}</span>
          <Button onClick={() => dispatch(incrementQuantity(record.id))}>+</Button> */}
          <Button onClick={()=>handleDecrement(record.id)}>-</Button>
          <span>{quantity}</span>
          <Button onClick={()=>handleIncrement(record.id)}>+</Button>
        </div>

      ),
    },
    {
      title:<h2>Total</h2>,
      dataIndex:"total",
      key:"total",
      render:(total)=><p>${(total||0).toFixed(2)}</p>
    },
    {
      title: <h2>Actions</h2>,
      key: "actions",
      render: (text, record) => (
        <Button
          type="primary"
          danger
          onClick={() => handleRemove(record)}
        >
          Remove
        </Button>
      ),
    },
  ];
  
  return (
    <div>
      <Table
        dataSource={cartItems}
        columns={columns}
        rowKey="id"
        pagination={false}
        className="cart-table"
      />
      <div style={{display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <h2>Subtotal: ${subtotal.toFixed(2)}</h2> {/* Display subtotal */}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <Button
          type="primary"
          danger
          // onClick={() => dispatch(clearCart())}
          onClick={handleClearCart}
          className="clear-cart-button"
        >
          Clear Cart
        </Button>
        <Button className="checkout-button" type="primary">
          Checkout Now
        </Button>
      </div>
    </div>
  );
}

export default Cart;