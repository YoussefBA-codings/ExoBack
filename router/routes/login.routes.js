require('dotenv').config();
const jwt = require('jsonwebtoken');
let tokens = require('../../tokens');


module.exports = (router) => {
  router.route('/api/token')
    .post(async (req, res) => {
      // #swagger.tags = ['Login']
      try {
		if(!req?.body?.email || !req?.body?.name) return res.status(403).json({'message' : 'email and name must be sent ..'}); 
        
		const token = jwt.sign({ email: req.body.email}, process.env.private_key, { expiresIn: '24h' })
		tokens.push({token, limit : 80000})
		return res.json({ email: req.body.email, token });
      }catch (err) {
        res.status(500).json({ message: `Une erreur est survenue. Veuillez réessayer plus tard.`, data: err })
      }
    })
}