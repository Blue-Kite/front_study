import { atom } from "recoil";

export type Ttodo = {
  id: number;
  content: string;
};

export const todoListState = atom<Ttodo[]>({
  key: "todoListState",
  default: [],
});
