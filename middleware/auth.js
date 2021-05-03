require('dotenv').config();
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization

  if (!authorizationHeader)
    return res.status(401).json({ message: `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.` })

  const token = authorizationHeader.split(' ')[1]
  jwt.verify(token, process.env.private_key, (error, decodedToken) => {
    if (error)
      return res.status(401).json({ message: `L'utilisateur n'est pas autorisé à accèder à cette ressource.`, data: error })

    next()
  })
}