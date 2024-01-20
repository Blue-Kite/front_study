import { graphql } from "msw";
import { GET_PRODUCTS, GET_PRODUCT } from "../graphql/products";
import {
  GET_CART,
  ADD_CART,
  CartType,
  UPDATE_CART,
  DELETE_CART,
} from "../graphql/cart";
import { EXECUTE_PAY } from "../graphql/payment";

//상품 데이터
const mockProduct = (() =>
  Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1 + "",
    imageUrl: `https://picsum.photos/id/${i + 1}/200/300 `,
    price: Math.floor(Math.random() * (50000 - 2000) + 1),
    title: `임시상품${i + 1}`,
    description: `임시상세내용${i + 1}`,
    createdAt: new Date(1651225354270 + i * 1000 * 60 * 60 * 10).toString(),
  })))();

let cartData: { [key: string]: CartType } = (() => ({}))();

export const handlers = [
  graphql.query(GET_PRODUCTS, (req, res, ctx) => {
    return res(
      ctx.data({
        products: mockProduct,
      })
    );
  }),
  graphql.query(GET_PRODUCT, (req, res, ctx) => {
    const found = mockProduct.find((item) => item.id === req.variables.id);
    if (found) return res(ctx.data(found));
    return res();
  }),

  graphql.query(GET_CART, (req, res, ctx) => {
    return res(ctx.data(cartData));
  }),
  graphql.mutation(ADD_CART, (req, res, ctx) => {
    const newCarData = { ...cartData };
    const id = req.variables.id;
    const targetProduct = mockProduct.find(
      (item) => item.id === req.variables.id
    );
    if (!targetProduct) {
      throw new Error("상품이 없습니다");
    }
    const newItem = {
      ...targetProduct,
      amount: (newCarData[id]?.amount || 0) + 1,
    };
    newCarData[id] = newItem;
    cartData = newCarData;
    return res(ctx.data(cartData));
  }),
  graphql.mutation(UPDATE_CART, (req, res, ctx) => {
    const newData = { ...cartData };
    const { id, amount } = req.variables;
    if (!newData[id]) {
      throw new Error("없는 데이터 입니다");
    }
    const newItem = {
      ...newData[id],
      amount,
    };
    newData[id] = newItem;

    cartData = newData;
    return res(ctx.data(newItem));
  }),
  graphql.mutation(DELETE_CART, ({ variables: { id } }, res, ctx) => {
    const newData = { ...cartData };
    delete newData[id];
    cartData = newData;
    return res(ctx.data(id));
  }),
  graphql.mutation(EXECUTE_PAY, ({ variables }, res, ctx) => {
    //console.log(Array.isArray(ids)) : false 왜???
    const ids = variables.ids;

    ids.map((id: string) => delete cartData[id]);
    return res(ctx.data(ids));
  }),
];
