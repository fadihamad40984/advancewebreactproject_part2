import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'fadihamad',
  password: 'SfE#76132',
  database: 'advance_web',
});

export default db; 
