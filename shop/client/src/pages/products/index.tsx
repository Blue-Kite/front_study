import { useQuery } from "@tanstack/react-query";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import ProductItem from "../../components/product/item";
import { GET_PRODUCTS, Products } from "../../graphql/products";

const ProductListPage = () => {
  /* const { data } = useQuery<Product[]>(QueryKeys.PRODUCTS, () => resfetcher({
    method: 'GET',
    path: '/products'
  }))  */

  const { data, isLoading, error } = useQuery<Products>({
    queryKey: [QueryKeys.PRODUCTS],
    queryFn: () => graphqlFetcher(GET_PRODUCTS) as Promise<Products>,
  });

  if (isLoading) {
    <div>Loading...</div>;
  } else if (error) {
    <div> error</div>;
  }

  return (
    <div>
      <h2>상품목록</h2>
      <ul className="products">
        {data?.products?.map((PRODUCT) => (
          <ProductItem {...PRODUCT} key={PRODUCT.id}></ProductItem>
        ))}
      </ul>
    </div>
  );
};

export default ProductListPage;
