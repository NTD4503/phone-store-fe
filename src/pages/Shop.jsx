import React, { useEffect, useState } from "react";
import { fetchAllProduct } from "../services/ProductService";
import ReactPaginate from "react-paginate";
import { debounce } from "lodash";
import { FiFilter } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import { BreadcrumbsWithIcon } from "../components/BeardScrumb";

const Shop = () => {
  const [listProducts, setListProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const [keyWord, setKeyWord] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [ratingFrom, setRatingFrom] = useState("");
  const [ratingTo, setRatingTo] = useState("");

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    let res = await fetchAllProduct();
    if (res && res.products) {
      setListProducts(res.products);
      setFilteredProducts(res.products);
      setSearchedProducts(res.products);
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setKeyWord(term);
    debouncedFilter(term);
  };

  const debouncedFilter = debounce((term) => {
    if (term) {
      const searched = filteredProducts.filter((item) =>
        item.title.toLowerCase().includes(term.toLowerCase())
      );
      setSearchedProducts(searched);
    } else {
      setSearchedProducts(filteredProducts);
    }
    setCurrentPage(0);
  }, 500);

  const applyFilters = () => {
    let filtered = [...listProducts];

    if (priceFrom !== "" || priceTo !== "") {
      filtered = filtered.filter((item) => {
        const price = Number(item.price);
        const from = priceFrom === "" ? -Infinity : Number(priceFrom);
        const to = priceTo === "" ? Infinity : Number(priceTo);
        return price >= from && price <= to;
      });
    }

    if (ratingFrom !== "" || ratingTo !== "") {
      filtered = filtered.filter((item) => {
        const rating = Number(item.rating) || 0;
        const from = ratingFrom === "" ? -Infinity : Number(ratingFrom);
        const to = ratingTo === "" ? Infinity : Number(ratingTo);
        return rating >= from && rating <= to;
      });
    }

    setFilteredProducts(filtered);

    if (keyWord) {
      const searched = filtered.filter((item) =>
        item.title.toLowerCase().includes(keyWord.toLowerCase())
      );
      setSearchedProducts(searched);
    } else {
      setSearchedProducts(filtered);
    }

    setCurrentPage(0);
    setFilterOpen(false);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = searchedProducts.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(searchedProducts.length / itemsPerPage);

  return (
    <div className="relative overflow-x-auto sm:rounded-lg bg-white p-6">
      <h1 className="text-2xl font-bold mb-6 px-4">Shop</h1>
      <BreadcrumbsWithIcon />

      <div className="flex justify-center items-center space-x-2 px-6 py-3 relative">
        <input
          value={keyWord}
          onChange={handleSearch}
          placeholder="Search"
          type="text"
          className="form-control border border-gray-950 rounded-md px-3 py-2 flex-grow"
        />
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="p-2 border border-gray-300 rounded-md hover:bg-gray-100"
          aria-label="Open filter dropdown"
        >
          <FiFilter size={24} />
        </button>
        <button
          onClick={() => {
            setPriceFrom("");
            setPriceTo("");
            setRatingFrom("");
            setRatingTo("");
            setKeyWord("");
            setFilteredProducts(listProducts);
            setSearchedProducts(listProducts);
            setCurrentPage(0);
            setFilterOpen(false);
          }}
          className="p-2 border border-gray-300 rounded-md hover:bg-gray-100"
          aria-label="Reset filters"
        >
          Reset
        </button>

        {filterOpen && (
          <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-gray-300 rounded-md shadow-lg p-4 z-50">
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Lọc theo giá</h3>
              <div className="flex space-x-2">
                <input
                  type="number"
                  min="0"
                  placeholder="Từ"
                  value={priceFrom}
                  onChange={(e) => setPriceFrom(e.target.value)}
                  className="w-1/2 border border-gray-300 rounded px-2 py-1"
                />
                <input
                  type="number"
                  min="0"
                  placeholder="Đến"
                  value={priceTo}
                  onChange={(e) => setPriceTo(e.target.value)}
                  className="w-1/2 border border-gray-300 rounded px-2 py-1"
                />
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Lọc theo đánh giá</h3>
              <div className="flex space-x-2">
                <input
                  type="number"
                  min="0"
                  max="5"
                  placeholder="Từ (sao)"
                  value={ratingFrom}
                  onChange={(e) => setRatingFrom(e.target.value)}
                  className="w-1/2 border border-gray-300 rounded px-2 py-1"
                />
                <input
                  type="number"
                  min="0"
                  max="5"
                  placeholder="Đến (sao)"
                  value={ratingTo}
                  onChange={(e) => setRatingTo(e.target.value)}
                  className="w-1/2 border border-gray-300 rounded px-2 py-1"
                />
              </div>
            </div>

            <button
              onClick={applyFilters}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Áp dụng
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
        {currentItems &&
          currentItems.length > 0 &&
          currentItems.map((item, index) => (
            <ProductCard product={item} key={`product-${index}`} />
          ))}
      </div>

      <div className="flex justify-center mt-6">
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< Prev"
          renderOnZeroPageCount={null}
          containerClassName="flex items-center space-x-2"
          pageClassName="px-3 py-1 border rounded-md text-gray-700 hover:bg-blue-100"
          activeClassName="bg-blue-500 text-white"
          previousClassName="px-3 py-1 border rounded-md text-gray-700 hover:bg-blue-100"
          nextClassName="px-3 py-1 border rounded-md text-gray-700 hover:bg-blue-100"
          breakClassName="px-3 py-1"
        />
      </div>
    </div>
  );
};

export default Shop;
