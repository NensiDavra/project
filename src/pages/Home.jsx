import homeImage from "../assets/img/home2.jpg";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-container">
      <h2 className="home-title">Welcome to Our Website</h2>
      <div className="home-content">
        <p className="description">
          Discover a world of possibilities with our wide range of products,
          carefully curated to meet all your needs and desires. Whether you're upgrading your lifestyle,
          exploring the latest trends, or shopping for essentials, we have something for everyone!
        <button className="home-button">See Our Products</button>
        </p>
        <img className="img" src={homeImage} alt="Home" />
      </div>
      
    </div>
  );
}
export default Home;
