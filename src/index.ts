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
            type User{
                id:ID!
                name:String!
                username:String!
                email:String!
                phone:String!
                website: String!
            }
            type Todo{
                id: ID!
                title: String!
                completed: Boolean
                user: User
            }
            type Query{
                getTodos:[Todo]
                getAllUsers: [User]
                getUser(id: ID!):User
            }
        `,
        resolvers: {
            Todo: {
                user: async (todo) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.id}`)).data,
            },
            Query: {
                getTodos: async () => (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
                getAllUsers: async () => (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
                getUser: async (parent, { id }) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data,
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