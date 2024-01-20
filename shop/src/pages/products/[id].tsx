import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import { GET_PRODUCT, PRODUCT } from "../../graphql/products";
import ProductDetail from "../../components/product/detail";

const ProductDetailPage = () => {
  const { id } = useParams();

  const { data } = useQuery<PRODUCT>({
    queryKey: [QueryKeys.PRODUCTS, id],
    queryFn: () => graphqlFetcher<PRODUCT>(GET_PRODUCT, { id }),
  });

  //아래 코드 없으면 에러남
  if (!data) return null;

  return (
    <div>
      <h1>제품 상세</h1>
      <ProductDetail item={data} />
    </div>
  );
};

export default ProductDetailPage;
