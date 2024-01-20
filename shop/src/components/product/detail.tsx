import { PRODUCT } from "../../graphql/products";

const ProductDetail = ({ item }: { item: PRODUCT }) => {
  return (
    <div className="product_detail">
      <p className="product-detail_title">{item.title}</p>
      <p className="product-detail_description">{item.description}</p>
      <img className="product-detail_image" src={item.imageUrl} />
      <span className="product-detail_price">${item.price}</span>
      <span className="product-detail_createAt">{item.createdAt}</span>
    </div>
  );
};

export default ProductDetail;
