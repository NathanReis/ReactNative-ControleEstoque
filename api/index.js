const cors = require('cors');
const express = require('express');
require('express-async-errors');
const swaggerUi = require('swagger-ui-express');
const environment = require('./src/config/environment');

const APP = express();
const PORT = environment.PORT;

APP.use(cors(), express.json(), require('./src/middleware/trimValues'));

APP.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('./swagger.json')));
APP.use('/categories', require('./src/routes/categories'));
APP.use('/products', require('./src/routes/products'));

APP.use(require('./src/middleware/catchError'));

APP.listen(PORT, () => console.log(`Running on ${PORT}`));
