const cors = require('cors');
const express = require('express');
require('express-async-errors');
const swaggerUi = require('swagger-ui-express');

const APP = express();
const PORT = process.env.PORT;

APP.use(cors(), express.json());

APP.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('./swagger.json')));
APP.use('/categories', require('./src/routes/categories'));

APP.use(require('./src/middleware/catchError'));

APP.listen(PORT, () => console.log(`Running on ${PORT}`));
