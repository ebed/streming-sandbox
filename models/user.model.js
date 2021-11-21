const con = require('./database')

const User = function (user) {
  this.name = user.name
  this.email = user.email
  this.password = user.password
}

User.create = (newUser, result) => {
  con.query('INSERT INTO users SET ?', newUser, function (error, results) {
    if (error) {
      console.log('error: ', error)
      result(error, null)
      return
    };
    console.log('Usuario creado: ', { id: result.insertID, newUser })
    result(null, { id: result.insertId, newUser })
  })
}

User.getAll = (email, result) => {
  let query = 'select * from users'
  if (email) {
    query += " WHERE email ilike '% " + email + "'"
  }
  con.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }
    console.log('Usuarios ', res)
    result(null, res)
  })
}

User.findByEmail = (email, result) => {
  const query = 'select * from users WHERE email = "' + email + '"'

  con.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }
    if (res.length) {
      result(null, res[0])
      return
    }

    // not found Tutorial with the id
    result({ kind: 'not_found' }, null)
  })
}

User.findByEmailPassword = (email, password, result) => {
  const query = 'select * from users WHERE email = "' + email + '" and password = "' + password + '"'
  console.log(query)
  con.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }
    if (res.length) {
      result(null, res[0])
      return
    }

    // not found Tutorial with the id
    result({ kind: 'not_found' }, null)
  })
}

module.exports = User
