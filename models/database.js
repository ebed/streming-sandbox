const mysql = require('mysql');
const dbConfig = require('../config/db.config');
console.log(dbConfig);
const connection = mysql.createConnection({
              host: dbConfig.HOST,
              user: dbConfig.USER,
              password: dbConfig.PASSWORD,
              database:  dbConfig.DB    
        })

connection.connect(error =>{
    if (error) throw error;
    console.log("Coneccion establecida!");
});


// connection.query('select 1 + 1 as solution', function (err, rows, fields) {
//       if (err) throw err

//       console.log('the solution is: ', rows[0].solution)
    
// })

         // connection.end()
module.exports = connection; 
