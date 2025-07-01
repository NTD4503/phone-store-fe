import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { Card, Button, Typography } from "antd";
import { toast } from "react-toastify";
import { ShoppingCartOutlined } from "@ant-design/icons";
const { Meta } = Card;
const { Title } = Typography;

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      style={{ width: "100%" }}
      cover={
        <img
          alt={product.title}
          src={product.thumbnail || product.images?.[0]}
          style={{ width: "100%", objectFit: "contain" }}
        />
      }
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <Title level={5} ellipsis={{ rows: 1 }}>
        {product.title}
      </Title>

      <div className="text-red-600 font-semibold">${product.price}</div>

      <div style={{ fontSize: 16 }}>
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i}>{i < Math.floor(product.rating) ? "⭐" : ""}</span>
        ))}
      </div>
    </Card>
  );
};

export default ProductCard;
