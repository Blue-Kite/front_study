import { atom } from "recoil";
import { CartType } from "../graphql/cart";

export const checkedCartState = atom<CartType[]>({
  key: "cartState",
  default: [],
});

/* const cartState = atom<Map<string, number>>({
  key: "cartState",
  default: new Map(),
});

//map 객체 : 키-값 
//a.get('키') / a.set('키', '값')
export const cartItemSelector = selectorFamily<number | undefined, string>({
  key: "cartItem",
  get:
    (id: string) =>
    ({ get }) => {
      if (cartState) {
        const carts = get(cartState);
        return carts.get(id);
      }
    },
  set:
    (id: string) =>
    ({ get, set }, newValue) => {
      console.log(newValue);
      if (typeof newValue === "number") {
        if (cartState) {
          const newCart = new Map([...get(cartState)]);
          newCart.set(id, newValue);
          set(cartState, newCart);
        }
      }
    },
});
 */
