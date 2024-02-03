import { Resolver } from "./types";

const mockProducts = (() =>
  Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1 + "",
    imageUrl: `https://picsum.photos/id/${i + 1}/200/300 `,
    price: Math.floor(Math.random() * (50000 - 2000) + 1),
    title: `임시상품${i + 1}`,
    description: `임시상세내용${i + 1}`,
    createdAt: new Date(1651225354270 + i * 1000 * 60 * 60 * 10).toString(),
  })))();

let cartData = [
  { id: "1", amount: 1 },
  { id: "2", amount: 2 },
];

const cartResolver: Resolver = {
  Query: {
    cart: (parent, args, context, info) => {
      return cartData;
    },
  },
  Mutation: {
    addCart: (parent, { id }, context, info) => {
      const newCarData = { ...cartData };
      const targetProduct = mockProducts.find((item) => item.id === id);
      if (!targetProduct) {
        throw new Error("상품이 없습니다");
      }
      const newItem = {
        ...targetProduct,
        amount: (newCarData[id]?.amount || 0) + 1,
      };
      newCarData[id] = newItem;
      cartData = newCarData;
      return newItem;
    },
    updateCart: (parent, { id, amount }, context, info) => {
      const newData = { ...cartData };
      if (!newData[id]) {
        throw new Error("없는 데이터 입니다");
      }
      const newItem = {
        ...newData[id],
        amount,
      };
      newData[id] = newItem;

      cartData = newData;
      return newData;
    },
    deleteCart: (parent, { id }, context, info) => {
      const newData = { ...cartData };
      delete newData[id];
      cartData = newData;
      return id;
    },
    executePay: (parent, { ids }, context, info) => {
      const newCarData = cartData.filter((cartItem) => {
        if (!ids.includes(cartItem.id)) return true;
        return false;
      });
      cartData = newCarData;
      return newCarData;
    },
  },
};

export default cartResolver;
