
const typeDefs = `
  type Book {
    title: String
    author: String
  }
type User{
    fullName: String
    name: String
    email: String
    password: String
}

  type Query {
    books: [Book]
    users : [User]
  }
`;

module.exports = typeDefs;
