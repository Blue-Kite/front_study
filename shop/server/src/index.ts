import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import schema from "./schema";
import resolvers from "./resolvers";
import { Cart, Products } from "./resolvers/types";

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

/* const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
};
 */
const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    context: async ({ req, res }) => ({ req, res }),
    listen: { port: 4000 },
  });
  console.log(`Server ready at ${url}`);
})();
