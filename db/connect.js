const mongoose = require('mongoose');

const connectDB = (url) => {
	// mongose v6 doesnt need the second arg obj
	return mongoose.connect(url, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	});
};

module.exports = connectDB;
