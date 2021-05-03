require('dotenv').config();
const auth = require('../../middleware/auth')
const jwt = require('jsonwebtoken')
const  WordCount  = require('../../utils')
let tokens = require('../../tokens')

module.exports = (router) => {
  router.route('/api/justify')
	.all(auth)
 	.get(async (req, res) => {
      // #swagger.tags = ['users']
      try {
		const token = req.headers.authorization.split(' ')[1]; 
		let tokenInfo = tokens.filter(el => el[0]?.token.localeCompare(token) === 0);
		if(tokenInfo.length === 0) {
			tokenInfo.push({
				token,
				limit : 80000
			})
			tokens.push(tokenInfo);
		}
	    const text = req.body;
		let count = 0;
		let justifiedText = '';
		if(tokenInfo[0].limit - WordCount(text) > 0) {
		let wordArray = text.split(/[' '\n]/).filter(w => w !== '');
		for(let i = 0; i < wordArray.length; i++) {
		if(count + wordArray[i].length <= 80 ) {
			justifiedText += wordArray[i] + ' ';
			count += wordArray[i].length + 1;
		} else {
			justifiedText += '\n' + wordArray[i] + ' ';
			count = 0;
		}
		}
		
		tokens.find(el => el[0]?.token.localeCompare(token) === 0).limit = tokenInfo[0]?.limit - WordCount(text);
		
		return res.status(200).send(justifiedText);	  
		} else {
			return res.status(402).json({message : 'Payment Required.'})
		}       
		} catch (err) {
        res.status(500).json({ message: `Une erreur est survenue. Veuillez réessayer plus tard.`, data: err })
      }
    })
}
    
