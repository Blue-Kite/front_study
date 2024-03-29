import gql from "graphql-tag";

const cartSchema = `#graphql
  type CartItem {
    id: ID!
    amount: Int!
    product: Product!
  }

  extend type Query {
    cart: [CartItem!]
  }

  extend type Mutation {
    addCart(productId: ID!): CartItem!
    updateCart(cartId: ID!, amount: Int!): CartItem!
    deleteCart(cartId: ID!): ID!
    executePay(ids: [ID!]): [ID!]
  }
`;

export default cartSchema;
