import { useMutation } from "@tanstack/react-query";
import { CartType, UPDATE_CART, DELETE_CART } from "../../graphql/cart";
import { QueryKeys, getClient, graphqlFetcher } from "../../queryClient";
import { ForwardedRef, SyntheticEvent, forwardRef } from "react";
import ItemData from "./itemData";

//onMuatate: 낙관적인 업데이트 성공할거라고 믿고 처리, onSuccess: 서버에서 성공한 값으로 처리
//리액트 쿼리의 장점: 쿼리키를 공유하는 컴포넌트에 업데이트 내용이 모두 반영됨

const CartItem = (
  { id, imageUrl, price, title, amount }: CartType,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const queryClient = getClient();
  const { mutate: updateCart } = useMutation({
    mutationFn: ({ id, amount }: { id: string; amount: number }) =>
      graphqlFetcher(UPDATE_CART, { id, amount }),
    onMutate: async ({ id, amount }) => {
      await queryClient.cancelQueries({ queryKey: [QueryKeys.CART] });
      const prevCart = queryClient.getQueryData<{ [key: string]: CartType }>([
        QueryKeys.CART,
      ]);
      if (!prevCart?.[id]) return prevCart;

      const newCart = {
        ...(prevCart || {}),
        [id]: { ...prevCart[id], amount },
      };
      queryClient.setQueryData([QueryKeys.CART], newCart);
      return prevCart;
    },
    onSuccess: (newValue) => {
      const prevCart = queryClient.getQueryData<{ [key: string]: CartType }>([
        QueryKeys.CART,
      ]);
      const newCart = {
        ...(prevCart || {}),
        [id]: newValue,
      };
      queryClient.setQueryData([QueryKeys.CART], newCart);
    },
  });

  const { mutate: deleteCart } = useMutation({
    mutationFn: ({ id }: { id: string }) => graphqlFetcher(DELETE_CART, { id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CART] });
    },
  });

  const handleDeleteItem = () => {
    deleteCart({ id });
  };

  const handleUpdateAmount = (e: SyntheticEvent) => {
    const amount = Number((e.target as HTMLInputElement).value);
    if (amount < 1) return;
    //mutation이 성공한 이후 변경된 값을 다시 가져와야함
    //queryClient.invalidateQueries({ queryKey: [QueryKeys.CART] }),를 대신해서 위 방식을 사용
    updateCart({ id, amount });
  };
  return (
    <li className="cart-item">
      <input
        className="cart-item__checkbox"
        type="checkbox"
        name={`select-item`}
        ref={ref}
        data-id={id}
      />
      <ItemData title={title} imageUrl={imageUrl} price={price} />
      <input
        className="cart-item__amount"
        type="number"
        value={amount}
        onChange={handleUpdateAmount}
        min={1}
      />
      <button
        className="cart-item__button"
        type="button"
        onClick={handleDeleteItem}
      >
        삭제
      </button>
    </li>
  );
};

export default forwardRef(CartItem);
