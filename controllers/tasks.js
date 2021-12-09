const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
	const tasks = await Task.find({});
	res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
	const task = await Task.create(req.body);
	res.status(201).json({ task });
});

const getSingleTask = asyncWrapper(async (req, res, next) => {
	const { id: taskID } = req.params;
	const task = await Task.findOne({ _id: taskID });
	if (!task) {
		return next(createCustomError('Task not found', 404));
	}
	res.status(200).json({ task });
});

// patch only updates the properties passed on body
const updateTask = asyncWrapper(async (req, res) => {
	const { id: taskID } = req.params;
	const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
		new: true,
		runValidators: true,
	});
	// third arg - must have for update
	// new -> returns on task the updated obj
	// runValidators -> run validators from schema
	if (!task) {
		return next(createCustomError('Task not found', 404));
	}
	res.status(200).json({ task });
});

// put replaces the obj with the body passed
const editTask = asyncWrapper(async (req, res) => {
	const { id: taskID } = req.params;
	const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
		new: true,
		runValidators: true,
		overwrite: false,
	});
	// overwrite for put -> false -> will only replace the props passed on body
	// if true -> will replace the object with the body passed
	if (!task) {
		return next(createCustomError('Task not found', 404));
	}
	res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
	const { id: taskID } = req.params;
	const task = await Task.findOneAndDelete({ _id: taskID });
	if (!task) {
		return next(createCustomError('Task not found', 404));
	}
	// res.status(200).json({ task });
	// res.status(200).send();
	res.status(200).json({ task: null, success: true });
});

module.exports = {
	getAllTasks,
	createTask,
	getSingleTask,
	updateTask,
	deleteTask,
	editTask,
};

// before refact
// const createTask = async (req, res) => {
// 	try {
// 		const task = await Task.create(req.body);
// 		res.status(201).json({ task });
// 	} catch (error) {
// 		res.status(500).json({ msg: error });
// 	}
// };

// const getSingleTask = async (req, res) => {
// 	try {
// 		const { id: taskID } = req.params;
// 		const task = await Task.findOne({ _id: taskID });
// 		if (!task) {
// 			return res.status(404).json({ msg: 'task not found' });
// 		}
// 		res.status(200).json({ task });
// 	} catch (error) {
// 		res.status(500).json({ msg: error });
// 	}
// };

// // patch only updates the properties passed on body
// const updateTask = async (req, res) => {
// 	try {
// 		const { id: taskID } = req.params;
// 		const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
// 			new: true,
// 			runValidators: true,
// 		});
// 		// third arg - must have for update
// 		// new -> returns on task the updated obj
// 		// runValidators -> run validators from schema
// 		if (!task) {
// 			return res.status(404).json({ msg: 'task not found' });
// 		}
// 		res.status(200).json({ task });
// 	} catch (error) {
// 		res.status(500).json({ msg: error });
// 	}
// };

// // put replaces the obj with the body passed
// const editTask = async (req, res) => {
// 	try {
// 		const { id: taskID } = req.params;
// 		const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
// 			new: true,
// 			runValidators: true,
// 			overwrite: false,
// 		});
// 		// overwrite for put -> false -> will only replace the props passed on body
// 		// if true -> will replace the object with the body passed
// 		if (!task) {
// 			return res.status(404).json({ msg: 'task not found' });
// 		}
// 		res.status(200).json({ task });
// 	} catch (error) {
// 		res.status(500).json({ msg: error });
// 	}
// };

// const deleteTask = async (req, res) => {
// 	try {
// 		const { id: taskID } = req.params;
// 		const task = await Task.findOneAndDelete({ _id: taskID });
// 		if (!task) {
// 			return res.status(404).json({ msg: 'task not found' });
// 		}
// 		// res.status(200).json({ task });
// 		// res.status(200).send();
// 		res.status(200).json({ task: null, success: true });
// 	} catch (error) {
// 		res.status(500).json({ msg: error });
// 	}
// };
