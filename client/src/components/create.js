import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createRecipe } from '../actions/recipe'
// import axios from 'axios'

const Create = ({ createRecipe }) => {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [image, setImage] = useState(null)
	const [servings, setServings] = useState(1)
	const [time, setTime] = useState(10)
	const [ingredients, setIngredients] = useState([])
	const [steps, setSteps] = useState([])

	const addIngredient = () => {
		setIngredients([...ingredients, ''])
	}

	const handleChangeIngredient = (e, i) => {
		let newIngredients = [...ingredients]
		newIngredients[i] = e
		setIngredients(newIngredients)
	}

	const handleRemoveIngredient = i => {
		let newIngredients = [...ingredients]
		newIngredients.splice(i, 1)
		setIngredients(newIngredients)
	}

	const addStep = () => {
		setSteps([...steps, ''])
	}

	const handleChangeStep = (e, i) => {
		let newSteps = [...steps]
		newSteps[i] = e
		setSteps(newSteps)
	}

	const handleRemoveStep = i => {
		let newSteps = [...steps]
		newSteps.splice(i, 1)
		setSteps(newSteps)
	}

	const timeFormat = min => {
		let hours = Math.floor(min / 60)
		let minutes = min % 60
		if (minutes === 0) minutes = '00'
		return !hours ? `${minutes}m` : `${hours}h:${minutes}m`
	}

	const handleSubmit = e => {
		e.preventDefault()
		let newRecipe = new FormData()
		newRecipe.append('name', name)
		newRecipe.append('description', description)
		newRecipe.append('image', image)
		newRecipe.append('servings', servings)
		newRecipe.append('time', timeFormat(time))
		newRecipe.append(
			'ingredients',
			ingredients.map(i => i.trim()).filter(i => i)
		)
		newRecipe.append(
			'preparation',
			steps.map(i => i.trim()).filter(i => i)
		)
		createRecipe(newRecipe)
	}

	return (
		<div>
			<h1>Create</h1>
			<form
				onSubmit={handleSubmit}
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start'
				}}
			>
				<input
					type='text'
					placeholder='Name'
					value={name}
					onChange={e => setName(e.target.value)}
				/>
				<input
					type='text'
					placeholder='Description'
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>
				<input type='file' onChange={e => setImage(e.target.files[0])} />
				<label>{servings}</label>
				<input
					type='range'
					name='points'
					min='0'
					max='10'
					value={servings}
					onChange={e => setServings(e.target.value)}
				/>
				<label>{timeFormat(time)}</label>
				<input
					type='range'
					name='points'
					step='10'
					min='0'
					max='360'
					value={time}
					onChange={e => setTime(e.target.value)}
				/>
				<label>Ingredients</label>
				{ingredients.map((ingredient, index) => {
					return (
						<div key={index}>
							<h3>{index + 1}</h3>
							<input
								type='text'
								value={ingredient}
								onChange={e => handleChangeIngredient(e.target.value, index)}
							/>
							<button
								onClick={() => handleRemoveIngredient(index)}
								type='button'
							>
								Remove
							</button>
						</div>
					)
				})}
				<button type='button' onClick={addIngredient}>
					Add another ingredient
				</button>
				<label>Preparation steps</label>
				{steps.map((step, index) => {
					return (
						<div key={index}>
							<h3>{index + 1}</h3>
							<input
								type='text'
								value={step}
								onChange={e => handleChangeStep(e.target.value, index)}
							/>
							<button onClick={() => handleRemoveStep(index)} type='button'>
								Remove
							</button>
						</div>
					)
				})}
				<button type='button' onClick={addStep}>
					Add another step
				</button>
				<button type='submit'>Add</button>
			</form>
		</div>
	)
}

export default connect(null, { createRecipe })(Create)
