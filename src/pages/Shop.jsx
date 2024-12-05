import { useState } from "react";
import Filters from '../component/Filters';
import ProductList from "../component/ProductList";

function Shop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [categorys,setCategories]=useState([]);
  const [rating,setRating]=useState(null);

  const [brands, setBrands]=useState([]); 

  const handleSearch = (e) => setSearchQuery(e.target.value);

  return (
    <div style={{ display: 'flex' }}>
    <div>
      <Filters
        onCategoryChange={setSelectedCategories}
        onPriceChange={setPriceRange}
        onBrandChange={setSelectedBrands}
        categorys={categorys}
        onRatingChange={setRating}
        brands={brands} 
        style={{width:'50rem'}}
      /> 
    </div>
      <div>
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearch}
          style={{
            width: "20rem",
            fontSize: "20px",
            borderRadius: "10px",
            padding: "10px"
          }}
        />
        <ProductList
          searchQuery={searchQuery}
          categories={selectedCategories}
          priceRange={priceRange}
          brands={selectedBrands}
          setCategories={setCategories}
          rating={rating}
          setBrand={setBrands} 
          // rating={setRating}
        />
      </div>
    </div>
  );
}

export default Shop;



