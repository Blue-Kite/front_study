import { useQuery } from "@tanstack/react-query";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import { CartType } from "../../graphql/cart";
import CartList from "../../components/cart";

import { GET_CART } from "../../graphql/cart";

const Cart = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QueryKeys.CART],
    queryFn: () => graphqlFetcher(GET_CART),
    staleTime: 0,
    gcTime: 1,
  });

  console.log(data);
  if (isLoading) {
    <div>Loading...</div>;
  } else if (error) {
    <div> error</div>;
  }

  console.log(data);
  const cartItems = Object.values(data || ({} as CartType[]));

  if (!cartItems.length) return <div>장바구니가 비었어요</div>;
  return <CartList items={cartItems} />;
};

export default Cart;
