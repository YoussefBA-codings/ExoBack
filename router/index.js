const express = require('express');
const LoginRoutes = require('./routes/login.routes')
const TestRoutes = require('./routes/test.routes');


const router = express.Router();

LoginRoutes(router);
TestRoutes(router);

module.exports = router