const crypto = require('crypto')
const User = require('../models/user.model.js')
const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256')
  const hash = sha256.update(password).digest('base64')
  return hash
}
const authTokens = {}
const generateAuthToken = () => {
  return crypto.randomBytes(30).toString('hex')
}

exports.register = (req, res) => {
  console.log(req.body)
  const { email, firstName, lastName, password, confirmPassword } = req.body
  if (password === confirmPassword) {
    User.findByEmail(email, (err, data) => {
      if (err) {
        console.log('errror')
        console.log(err)
        const hashedPassword = getHashedPassword(password)
        const user = new User({
          email: email,
          name: firstName + ' ' + lastName,
          password: hashedPassword
        })

        User.create(user, (err, data) => {
          console.log('creando')
          if (err) {
            console.log(err)
            res.render('signup',
              {
                message: 'Registración no fue posible, intenta nuevamente',
                messageClass: 'alert-danger'
              })
          } else {
            console.log('signin')
            res.render('login',
              {
                message: 'Registración Completa! Ahora ingresa con tu nueva cuenta',
                messageClass: 'alert-success'
              })
          }
        })
      } else {
        res.render('signup', {
          message: 'Ese correo ya pertenece a un usuario registrado.',
          messageClass: 'alert-danger'
        })
      }
    })
  }
}

exports.login = (req, res) => {
  res.render('login')
}

exports.signin = (req, res) => {
  const { email, password } = req.body
  const hashedPassword = getHashedPassword(password)
  console.log(hashedPassword)
  User.findByEmailPassword(email, hashedPassword, (err, data) => {
    if (err) {
      res.render('login', {
        message: 'Invalid username or password',
        messageClass: 'alert-danger'
      })
    } else {
      const authToken = generateAuthToken()
      req.session.AuthToken = authToken
      req.session.userEmail = data.email
      req.session.userName = data.name
      res.redirect('/videos')
    }
  })
}

exports.logout = (req, res) => {
  req.session = null
  res.redirect('login')
}

exports.signup = (req, res) => {
  res.render('signup')
}
