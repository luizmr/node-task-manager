// middleware wrapper to handle try catch inside controllers
// receieves the funcion as arg fn
// return a middleware function which receives req, res and next
// try to call fn passing the args
// if fails, catch the error
const asyncWrapper = (fn) => {
	return async (req, res, next) => {
		try {
			await fn(req, res, next);
		} catch (error) {
			// express has a builtin method to handle error inside next if a custom handle is not called
			// the custom handler is called inside app.js - app.use(errorHandler)
			next(error);
		}
	};
};

module.exports = asyncWrapper;
