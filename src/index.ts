import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { expressMiddleware } from "@apollo/server/express4"
import cors from "cors";
import bodyParser from "body-parser";
import express from 'express';
import axios from 'axios';

async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
            type Todo{
                id: ID!
                title: String!
                completed: Boolean
            }
            type Query{
                getTodos:[Todo]
            }
        `,
        resolvers: {
            Query: {
                getTodos: async () => (await axios.get("https://jsonplaceholder.typicode.com/todos")).data
            }
        }
    });

    app.use(bodyParser.json());
    app.use(cors());
    await server.start();

    app.use("/graphql", expressMiddleware(server))

    app.listen(8000, () => console.log('Server started at port 8000'));
}
startServer();