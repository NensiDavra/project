import {  useState } from "react";
import "../styles/Filters.css";
import {
  Checkbox,
  Input,
  Rate,
  Row,
  Col,
  Space,
  Typography,
  Button,
} from "antd";
import {DownOutlined, UpOutlined} from "@ant-design/icons";

const { Title, Text } = Typography;
function Filters({
  onCategoryChange,
  onPriceChange,
  onBrandChange,
  onRatingChange,
  categorys,
  ratings,
  brands,
}) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [showMoreBrands, setShowMoreBrands] = useState(false);

  const hadleClearall=()=>{
    setSelectedCategories([]);
    setPriceRange({ min: "", max: "" });
    setSelectedBrands([]);
    setSelectedRating(0);

    onCategoryChange([]);
    onPriceChange({ min: 0, max: 5000});
    onBrandChange([]);
    onRatingChange(null);
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    const updatedCategories = checked
      ? [...selectedCategories, value]
      : selectedCategories.filter((category) => category !== value);
    setSelectedCategories(updatedCategories);
    onCategoryChange(updatedCategories);
  };

  const handlePriceRange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => {
      const updatedPriceRange = { ...prev, [name]: value };
      onPriceChange(updatedPriceRange);
      return updatedPriceRange;
    });
  };

  const handleBrandSelect = (e) => {
    const { value, checked } = e.target;
    const updatedBrands = checked
      ? [...selectedBrands, value]
      : selectedBrands.filter((brand) => brand !== value);
    setSelectedBrands(updatedBrands);
    onBrandChange(updatedBrands);
  };

  const handleRating = (rating) => {
    setSelectedRating(rating);
    onRatingChange(rating);
  };

  const toggleShowMoreBrands = () => {
    setShowMoreBrands(!showMoreBrands);
  };

  const displayedBrands = showMoreBrands ? brands : brands.slice(0, 5);

  return (
    <div className="filters">
      <Title level={2}>Filters</Title>

      {/* Categories Section */}
      <div className="filter-section">
        <Title level={3}>Categories</Title>
        <Row>
          {categorys?.map((cate) => (
            <Col key={cate} span={24}>
              <Checkbox
                value={cate}
                checked={selectedCategories.includes(cate)}
                onChange={handleCategoryChange}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                  fontSize: "15px",
                }}
              >
                {cate}
              </Checkbox>
            </Col>
          ))}
        </Row>
      </div>

      {/* Price Range Section */}
      <div className="filter-section">
        <Title level={3}>Price Range</Title>
        <Space direction="horizontal">
          <Input
            type="number"
            placeholder="Min"
            name="min"
            value={priceRange.min}
            onChange={handlePriceRange}
          />
          <Text>-</Text>
          <Input
            type="number"
            placeholder="Max"
            name="max"
            value={priceRange.max}
            onChange={handlePriceRange}
          />
        </Space>
      </div>
    
      <div className="filter-section">
        <Title level={3}>Brands</Title>
        <Row>
          {displayedBrands?.map((brand) => (
            <Col key={brand} span={24}>
              <Checkbox
                value={brand}
                checked={selectedBrands.includes(brand)}
                onChange={handleBrandSelect}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                  fontSize: "15px",
                }}
              >
                {brand}
              </Checkbox>
            </Col>
          ))}
        </Row>
        {brands.length >5 && (
          <Button
          type="link"
          onClick={toggleShowMoreBrands}
          style={{padding:0, fontSize: "14px", alignItems:"center"}}>
            {showMoreBrands ? (<>Show Less <UpOutlined /></>) : (<>Show More <DownOutlined /></>)}
          </Button>
        )}
      </div>

      <div className="filter-section">
        <Title level={3}>Rating</Title>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Rate
            value={selectedRating}
            onChange={(value) => handleRating(value)} // Update rating on selection
            style={{ fontSize: "25px" }}
          />
        </div>
      </div>

      <div>
        <Button
        onClick={hadleClearall}
          style={{
            color: "black",
            backgroundColor: "lightgrey",
            fontSize: "15px",
            border: "1px solid black",
          }}
        >
          Clear All
        </Button>
      </div>
    </div>
  );
}

export default Filters;
