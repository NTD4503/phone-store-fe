import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailProductThunk } from "../redux/product/productThunk";
import { addToCart } from "../redux/cart/cartSlice";
import { toast } from "react-toastify";
import { Typography, Button, Layout } from "antd";

const { Title, Paragraph } = Typography;
const { Header, Content, Footer } = Layout;

const RatingStars = memo(({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i}>{i < Math.floor(rating) ? "⭐" : ""}</span>
  ));
  return <div className="text-yellow-500 text-xl">{stars}</div>;
});

const DetailProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const token = useSelector((state) => state.user.token);
  const detailProduct = useSelector((state) => state.product.detailProduct);
  const loading = useSelector((state) => state.product.loading);

  useEffect(() => {
    dispatch(fetchDetailProductThunk(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (detailProduct) {
      setSelectedImage(detailProduct.thumbnail || detailProduct.images?.[0]);
    }
  }, [detailProduct]);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!token) {
      toast.error("Vui lòng đăng nhập.");
      return;
    }
    dispatch(addToCart(detailProduct));
    toast.success("Thêm vào giỏ thành công");
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    if (!token) {
      toast.error("Vui lòng đăng nhập.");
      return;
    }
    dispatch(addToCart(detailProduct));
    toast.success("Đã thêm vào giỏ");
    navigate("/cart");
  };

  if (loading || !detailProduct) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="relative overflow-x-auto sm:rounded-lg bg-white p-4 h-full">
      <div className="bg-white rounded-lg p-6">
        <Title level={2}>Chi tiết sản phẩm</Title>

        <div className="grid grid-cols-6 gap-8">
          <div className="col-span-6 md:col-span-2">
            <div className="mb-4">
              <img
                src={selectedImage}
                alt={detailProduct.title}
                className="w-full h-full object-cover rounded-lg shadow"
              />
            </div>

            <div
              className={`flex gap-2 ${
                detailProduct.images?.length > 1 ? "overflow-x-auto" : ""
              }`}
            >
              {detailProduct.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 object-cover rounded cursor-pointer border-2 transition ${
                    img === selectedImage
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="col-span-6 md:col-span-4">
            <Layout
              style={{ background: "transparent", padding: 0, border: "none" }}
            >
              <Header style={{ background: "transparent", padding: 0 }}>
                <Title level={4} style={{ margin: 0, color: "#1f1f1f" }}>
                  {detailProduct.title}
                </Title>
              </Header>

              <Content style={{ padding: 0 }}>
                <Paragraph type="secondary">
                  {detailProduct.description}
                </Paragraph>
                <div
                  style={{ color: "#e60023", fontWeight: "bold", fontSize: 16 }}
                >
                  ${detailProduct.price}
                </div>
                <RatingStars rating={detailProduct.rating} />
              </Content>

              <Footer
                style={{ background: "transparent", padding: "12px 0 0 0" }}
              >
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
            </Layout>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
