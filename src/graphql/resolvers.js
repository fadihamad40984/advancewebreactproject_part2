
const User = require('../models/users.js')

const books = [
  {
    title: 'Palestine',
    author: 'Fadi Hamad',
  },
  {
    title: 'Palestine - Nablus',
    author: 'Ahmad Hamad',
  },
];

const resolvers = {
  Query: {
    books: () => {
      return books;
    },
    users: async () =>{
      const users = await User.findAll();
      return users;
    }
  },
};

module.exports = resolvers;
