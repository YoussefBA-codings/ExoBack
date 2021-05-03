const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');



const router = require('./router');

const hostname = 'localhost';
const port = 3001;

const app = express();

app
  .use(bodyParser.text({ type: 'text/*' }))
  .use(express.json())
  .use(router)
  .use(morgan('dev'))
  .use(({ res }) => {
    res.status(404).json({ message: 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.' });
  })



app.listen(port, hostname, function () {
  console.log("Mon serveur fonctionne sur http://" + hostname + ":" + port);
});

