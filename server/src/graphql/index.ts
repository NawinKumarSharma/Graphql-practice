import { ApolloServer } from "@apollo/server";
import { User } from "./user";
async function createApolloGraphqlServer () {
  // Create Graphql Server
  const gqlServer = new ApolloServer({
    typeDefs: `
      type Query{
        hello: String
      }
      type Mutation{
        ${User.mutations}
      }
    `, // Schema
    resolvers: {
        Query: {
          ...User.resolvers.queries,
        },
        Mutation: {
          ...User.resolvers.mutations,
        },
      },
    });

  // Start the gql server
  await gqlServer.start();
  return gqlServer;
}
export default createApolloGraphqlServer;