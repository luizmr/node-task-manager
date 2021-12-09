const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'must provide a name'],
		trim: true,
		maxlength: [20, 'name can not be more than 20 characters'],
	},
	completed: {
		type: Boolean,
		default: false,
	},
});

// required: bool or [bool, '']
// trim - remove "    test     " white spaces
// default - default value to be considered if prop is not given

// setup model of schema to be created on mongoDB inside our DB
// first arg is the name of the collection our schema relates to
// instance of a model/collection is called document (row of  a sql db)
module.exports = mongoose.model('Task', TaskSchema);
