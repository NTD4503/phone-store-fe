import ProductInfo from "./ProductInfo";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="grid grid-cols-6 gap-4 p-4 border rounded-lg shadow-md hover:shadow-xl cursor-pointer bg-white"
    >
      <div className="col-span-3">
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          className="w-full h-full object-cover rounded"
        />
      </div>

      <div className="col-span-3">
        <ProductInfo
          product={product}
          showDescription={false}
          showButtons={true}
        />
      </div>
    </div>
  );
};

export default ProductCard;
