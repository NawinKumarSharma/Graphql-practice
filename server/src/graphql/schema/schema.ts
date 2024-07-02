export const schema = `
type User{
    _id: ID!
    username: String!
    name: String!
    email: String
    createdAt: String!
    updatedAt: String!

}

type Query {
    hello: String
    hi: String
    users: [User]
    courses: [Course]
    lectures: [Lecture]
    
}
`