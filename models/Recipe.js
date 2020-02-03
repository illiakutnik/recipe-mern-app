const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
	name: String,
	description: String,
	image: String,
	servings: Number,
	ingredients: [String],
	preparation: [String],
	time: Number,
	date: {
		type: Date,
		default: Date.now
	},
	updated: Date
})

module.exports = Recipe = mongoose.model('recipe', RecipeSchema)
