import { useParams } from "react-router-dom";
import { fetchDetailProduct } from "../services/ProductService";
import { useEffect, useState } from "react";
import { BreadcrumbsWithIcon } from "../components/BeardScrumb";
import ProductInfo from "../components/ProductInfo";

const DetailProduct = () => {
  const { id } = useParams();
  const [detailProduct, setDetailProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getDetailProduct();
  }, [id]);

  const getDetailProduct = async () => {
    try {
      const res = await fetchDetailProduct(id);
      setDetailProduct(res);
      setSelectedImage(res.thumbnail || res.images?.[0]); // ảnh lớn mặc định
    } catch (err) {
      console.error("Lỗi khi fetch sản phẩm:", err);
    }
  };

  if (!detailProduct) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="relative overflow-x-auto sm:rounded-lg bg-white p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 px-4">Detail</h1>
      <BreadcrumbsWithIcon />
      <div className="grid grid-cols-6 gap-8 min-h-screen">
        <div className="col-span-6 md:col-span-2">
          <div className="mb-4 ">
            <img
              src={selectedImage}
              alt={detailProduct.title}
              className="w-full h-full object-cover rounded-lg shadow"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto">
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
          <ProductInfo
            product={detailProduct}
            showDescription={true}
            showButtons={true}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
