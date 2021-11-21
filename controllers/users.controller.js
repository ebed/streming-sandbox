const User = require('../models/user.model.js')

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'

    })
  }

  const user = new User({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password
  })

  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
                          err.message || 'Some error occurred while creating the User.'

      })
    } else res.send(data)
  })
}
exports.findAll = (req, res) => {
  const email = req.query.email
  console.log('FindAll')
  User.getAll(email, (err, user) => {
    if (err) {
      res.status(500).send({
        message:
                  err.message || 'Some error occurred while retrieving the users.'
      })
    } else res.send(user)
  })
}
