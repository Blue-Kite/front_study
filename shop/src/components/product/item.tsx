import { Link } from "react-router-dom";
import { PRODUCT } from "../../graphql/products";
import { useMutation } from "@tanstack/react-query";
import { graphqlFetcher } from "../../queryClient";
import { ADD_CART } from "../../graphql/cart";

const ProductItem = ({
  id,
  imageUrl,
  price,
  title,
  description,
  createdAt,
}: PRODUCT) => {
  //const [cartAmount, setCartAmount] = useRecoilState(cartItemSelector(id));
  //const addToCart = () => setCartAmount((prev) => (prev || 0) + 1);

  const { mutate: addCart } = useMutation({
    mutationFn: (id: string) => graphqlFetcher(ADD_CART, { id }),
  });
  return (
    <>
      <li className="product-item">
        <Link to={`/products/${id}`}>
          <p className="product-item_title">{title}</p>
          <p className="product-item_description">{description}</p>
          <img className="product-item_image" src={imageUrl} />
          <span className="product-item_price">${price}</span>
          <p className="product-item_description">{createdAt}</p>
        </Link>
        <button className="product-item_add-cart" onClick={() => addCart(id)}>
          담기
        </button>
      </li>
    </>
  );
};
export default ProductItem;
