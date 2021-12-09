const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
// to access .env file config
require('dotenv').config();

//####################### middlewares #######################

app.use(express.static('./public'));
// treat all req as json
app.use(express.json());

//####################### routes #######################

app.use('/api/v1/tasks', tasks);

// at the bottom of app.use, if route is not found, is called notFound
app.use(notFound);
// error handler msg middleware, if there is an error, this function returns the treatment of it
app.use(errorHandlerMiddleware);

//####################### starting server #######################

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, () => {
			console.log(`server listening on port: ${port} `);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
