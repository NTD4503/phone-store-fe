import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Layout, Typography, Button } from "antd";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const RatingStars = React.memo(({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i}>{i < Math.floor(rating) ? "⭐" : ""}</span>
  ));
  return <div className="text-yellow-500 text-xl">{stars}</div>;
});

const ProductInfo = ({
  product,
  showDescription = false,
  showButtons = true,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addProductToCart = () => {
    dispatch(addToCart(product));
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addProductToCart();
    toast.success("Thêm vào giỏ thành công");
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    addProductToCart();
    toast.success("Đã thêm vào giỏ");
    navigate("/cart");
  };

  return (
    <Layout
      style={{
        background: "transparent",
        padding: 0,
        border: "none",
      }}
    >
      <Header style={{ background: "transparent", padding: 0 }}>
        <Title level={4} style={{ margin: 0, color: "#1f1f1f" }}>
          {product.title}
        </Title>
      </Header>

      <Content style={{ padding: " 0" }}>
        {showDescription && (
          <Paragraph type="secondary">{product.description}</Paragraph>
        )}
        <div style={{ color: "#e60023", fontWeight: "bold", fontSize: 16 }}>
          ${product.price}
        </div>
        <RatingStars rating={product.rating} />
      </Content>

      {showButtons && (
        <Footer style={{ background: "transparent", padding: "12px 0 0 0" }}>
          <div style={{ display: "flex", gap: 8 }}>
            <Button
              style={{ background: "#f5222d", color: "#fff" }}
              type="primary"
              danger
              onClick={handleBuyNow}
            >
              Mua ngay
            </Button>
            <Button
              style={{ background: "#4CAF50", color: "#fff" }}
              type="primary"
              onClick={handleAddToCart}
            >
              Thêm vào giỏ
            </Button>
          </div>
        </Footer>
      )}
    </Layout>
  );
};

export default ProductInfo;
