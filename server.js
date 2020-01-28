const express = require('express')
const connectDB = require('./config/db')
const multer = require('multer')

const app = express()
connectDB()

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './uploads/')
	},
	filename: function(req, file, cb) {
		cb(null, new Date().toISOString() + file.originalname)
	}
})
const fileFilter = function(req, file, cb) {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true)
	} else {
		cb(null, false)
	}
}
const upload = multer({
	storage: storage,
	limits: {
		fieldSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
})

app.use(express.json({ extended: false }))
app.use('/uploads', express.static('uploads'))

const Recipe = require('./models/Recipe')

app.post('/new', upload.single('image'), async (req, res) => {
	const {
		name,
		description,
		servings,
		time,
		ingredients,
		preparation
	} = req.body
	const image = req.file ? req.file.path : ''
	try {
		let recipe = new Recipe({
			name,
			description,
			image,
			servings,
			time,
			ingredients,
			preparation
		})
		await recipe.save()
		res.send('success')
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

app.get('/all', async (req, res) => {
	try {
		let recipes = await Recipe.find()
		res.json(recipes)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

app.get('/recipe', async (req, res) => {
	let id = req.query.id
	try {
		let recipe = await Recipe.findById(id)
		if (!recipe)
			return res.status(400).json({ message: "Recipe doesn't exist" })
		res.json(recipe)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

app.post('/edit', async (req, res) => {
	let id = req.query.id
	const {
		name,
		description,
		servings,
		time,
		ingredients,
		preparation
	} = req.body
	let recipeFields = {}
	if (name) recipeFields.name = name
	if (description) recipeFields.description = description
	if (servings) recipeFields.servings = servings
	if (time) recipeFields.time = time
	if (ingredients) recipeFields.ingredients = ingredients
	if (preparation) recipeFields.preparation = preparation
	recipeFields.updated = Date.now()
	try {
		recipe = await Recipe.findByIdAndUpdate(
			id,
			{ $set: recipeFields },
			{ new: true }
		)
		res.json(recipe)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

app.delete('/delete', async (req, res) => {
	let id = req.query.id
	try {
		await Recipe.findByIdAndRemove(id)
		res.json({ message: 'recipe was deleted' })
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
