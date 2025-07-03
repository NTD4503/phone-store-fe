import React, { useEffect, useState, useCallback } from "react";
import { fetchAllProduct } from "../services/ProductService";
import ProductCard from "../components/ProductCard";
import { Layout, Input, Button, Dropdown, Row, Col, Pagination } from "antd";
import { FiFilter } from "react-icons/fi";
import { debounce } from "lodash";
import { fetchAllProductsThunk } from "../redux/product/productThunk";
import { useDispatch, useSelector } from "react-redux";

const { Header, Content } = Layout;

const Shop = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.product.allProducts);
  const [listProducts, setListProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;

  const [keyWord, setKeyWord] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [ratingFrom, setRatingFrom] = useState("");
  const [ratingTo, setRatingTo] = useState("");

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fetchAllProductsThunk());
    }
  }, [dispatch, allProducts.length]);

  useEffect(() => {
    setListProducts(allProducts);
    setFilteredProducts(allProducts);
    setSearchedProducts(allProducts);
  }, [allProducts]);

  const applyFilters = () => {
    let filtered = [...listProducts];

    if (priceFrom || priceTo) {
      const from = priceFrom === "" ? -Infinity : Number(priceFrom);
      const to = priceTo === "" ? Infinity : Number(priceTo);
      filtered = filtered.filter(
        (item) => Number(item.price) >= from && Number(item.price) <= to
      );
    }

    if (ratingFrom || ratingTo) {
      const from = ratingFrom === "" ? -Infinity : Number(ratingFrom);
      const to = ratingTo === "" ? Infinity : Number(ratingTo);
      filtered = filtered.filter(
        (item) =>
          Number(item.rating || 0) >= from && Number(item.rating || 0) <= to
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(0);
    setFilterOpen(false);
  };

  const debouncedSearch = useCallback(
    debounce((term, filteredList) => {
      if (term) {
        const searched = filteredList.filter((item) =>
          item.title.toLowerCase().includes(term.toLowerCase())
        );
        setSearchedProducts(searched);
      } else {
        setSearchedProducts(filteredList);
      }
      setCurrentPage(0);
    }, 500),
    []
  );

  const handleSearch = (e) => {
    const term = e.target.value;
    setKeyWord(term);
    debouncedSearch(term, filteredProducts);
  };

  useEffect(() => {
    debouncedSearch(keyWord, filteredProducts);
  }, [filteredProducts, keyWord, debouncedSearch]);

  const resetFilters = () => {
    setKeyWord("");
    setPriceFrom("");
    setPriceTo("");
    setRatingFrom("");
    setRatingTo("");
    setFilteredProducts(listProducts);
    setSearchedProducts(listProducts);
    setCurrentPage(0);
    setFilterOpen(false);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = searchedProducts.slice(offset, offset + itemsPerPage);

  const filterContent = (
    <div
      style={{
        padding: 12,
        width: 250,
        borderRadius: 4,
        border: "1px solid #d9d9d9",
        backgroundColor: "#fff",
      }}
    >
      <h4 style={{ marginBottom: 8 }}>Lọc theo giá</h4>
      <Input
        placeholder="Từ"
        value={priceFrom}
        onChange={(e) => setPriceFrom(e.target.value)}
        style={{ marginBottom: 8 }}
      />
      <Input
        placeholder="Đến"
        value={priceTo}
        onChange={(e) => setPriceTo(e.target.value)}
        style={{ marginBottom: 12 }}
      />

      <h4 style={{ marginBottom: 8 }}>Lọc theo đánh giá</h4>
      <Input
        placeholder="Từ (sao)"
        value={ratingFrom}
        onChange={(e) => setRatingFrom(e.target.value)}
        style={{ marginBottom: 8 }}
      />
      <Input
        placeholder="Đến (sao)"
        value={ratingTo}
        onChange={(e) => setRatingTo(e.target.value)}
        style={{ marginBottom: 12 }}
      />

      <div style={{ display: "flex", gap: "12px" }}>
        <Button type="primary" block onClick={applyFilters} style={{ flex: 1 }}>
          Áp dụng
        </Button>

        <Button
          onClick={resetFilters}
          style={{
            borderColor: "#C0C0C0",
            color: "#000000",
            backgroundColor: "#ffffff",
            flex: 1,
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );

  return (
    <Layout style={{ background: "#fff", height: "100%" }}>
      <Header
        style={{
          background: "#fff",
          margin: 0,
          position: "sticky",
          borderBottom: "1px dashed rgba(192, 192, 192, 0.5)",
          zIndex: 10,
        }}
      >
        <Row justify="center" align="middle" gutter={16}>
          <Col flex="auto" style={{ maxWidth: "600px" }}>
            <Input
              placeholder="Tìm kiếm..."
              value={keyWord}
              onChange={handleSearch}
              allowClear
              style={{ width: "100%" }}
            />
          </Col>

          <Col>
            <Dropdown
              dropdownRender={() => filterContent}
              trigger={["click"]}
              placement="bottomRight"
              visible={filterOpen}
              onVisibleChange={(open) => setFilterOpen(open)}
            >
              <Button icon={<FiFilter />} />
            </Dropdown>
          </Col>
        </Row>
      </Header>

      <Content style={{ padding: "24px", overflow: "auto" }}>
        <Row gutter={[16, 16]}>
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <ProductCard product={item} />
              </Col>
            ))
          ) : (
            <Col span={24} style={{ textAlign: "center" }}>
              Không có sản phẩm nào
            </Col>
          )}
        </Row>
      </Content>

      <div
        style={{
          padding: "10px",
          justifyItems: "center",
          textAlign: "center",
          borderTop: "1px dashed rgba(192, 192, 192, 0.5)",
        }}
      >
        <Pagination
          current={currentPage + 1}
          pageSize={itemsPerPage}
          total={searchedProducts.length}
          onChange={(page) => setCurrentPage(page - 1)}
          showSizeChanger={false}
        />
      </div>
    </Layout>
  );
};

export default Shop;
