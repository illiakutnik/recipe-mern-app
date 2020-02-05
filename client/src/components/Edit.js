import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { editRecipe } from '../actions/recipe'
import { RemoveCircleOutline } from 'styled-icons/material/RemoveCircleOutline'

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
`
const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 10px 0;
	width: 50%;
`
const TextInput = styled.input`
	background: var(--whitesmoke);
	padding: 5px;
	width: 100%;
`

const DescriptionInput = styled.textarea`
	background: var(--whitesmoke);
	padding: 5px;
	width: 100%;
	height: 90px;
`
const Label = styled.label`
	font-weight: 700;
	margin: 30px 0 10px 0;
`
const PhotoPickButton = styled.label`
	padding: 5px;
	background: var(--main);
	border-radius: 10px;
	box-shadow: var(--smallShadow);
`
const Range = styled.input`
	width: 100%;
`
const Button = styled.button`
	padding: 10px;
	margin-top: 10px;
	background: var(--main);
	border-radius: 10px;
	box-shadow: var(--smallShadow);
	border: none;
`
const SubmitButton = styled(Button)`
	margin-top: 30px;
	padding: 15px;
	font-weight: 700;
	font-size: 18px;
	width: 60%;
	color: white;
`
const ListContainer = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
`
const RemoveButton = styled(RemoveCircleOutline)`
	color: red;
	width: 35px;
	cursor: pointer;
`
const ErrorSuccess = styled.p`
	font-weight: 700;
	color: ${({ status }) => (status === 'error' ? 'red' : 'green')};
	text-align: center;
	padding: 10px 0 30px 0;
`

const Edit = ({ recipe, error, editRecipe }) => {
	const [name, setName] = useState(recipe.name)
	const [description, setDescription] = useState(recipe.description)
	const [image, setImage] = useState(recipe.image)
	const [servings, setServings] = useState(recipe.servings)
	const [time, setTime] = useState(recipe.time)
	const [ingredients, setIngredients] = useState(JSON.parse(recipe.ingredients))
	const [steps, setSteps] = useState(JSON.parse(recipe.preparation))
	const [isSubmitting, setIsSubmitting] = useState(false)

	const notChanged = () => {
		if (
			name !== recipe.name ||
			description !== recipe.description ||
			image !== recipe.image ||
			servings !== recipe.servings ||
			time !== recipe.time ||
			ingredients !== recipe.ingredients ||
			steps !== recipe.preparation
		) {
			return false
		}
		return true
	}

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

	const handleSubmit = async e => {
		e.preventDefault()
		setIsSubmitting(true)
		const ChangedRecipe = {
			name,
			description,
			image,
			servings,
			time,
			ingredients,
			steps
		}

		await editRecipe(recipe._id, ChangedRecipe)

		setIsSubmitting(false)
	}
	return (
		<>
			<Wrapper>
				<h1>EditRecipe</h1>
				<Form onSubmit={handleSubmit}>
					<Label>Name of your recipe</Label>
					<TextInput
						type='text'
						name='name'
						placeholder='Name'
						value={name}
						onChange={e => setName(e.target.value)}
						required
					/>
					<Label>Short description of your recipe</Label>
					<DescriptionInput
						type='text'
						placeholder='Description'
						value={description}
						onChange={e => setDescription(e.target.value)}
						required
					/>
					<Label>Photo</Label>
					<PhotoPickButton htmlFor='file-upload'>Choose photo</PhotoPickButton>
					<p>{image ? image.name : null}</p>
					<input
						type='file'
						style={{ display: 'none' }}
						id='file-upload'
						onChange={e => setImage(e.target.files[0])}
					/>
					<Label>Servings</Label>
					<span>{servings}</span>
					<Range
						type='range'
						min='0'
						max='10'
						value={servings}
						onChange={e => setServings(e.target.value)}
					/>
					<Label>Time</Label>
					<span>{timeFormat(time)}</span>
					<Range
						type='range'
						step='10'
						min='0'
						max='360'
						value={time}
						onChange={e => setTime(e.target.value)}
					/>
					<Label>Ingredients</Label>
					{ingredients.map((ingredient, index) => {
						return (
							<ListContainer key={index}>
								<h3>{index + 1})</h3>
								<TextInput
									style={{ margin: '0 10px' }}
									type='text'
									value={ingredient}
									onChange={e => handleChangeIngredient(e.target.value, index)}
								/>
								<RemoveButton
									onClick={() => handleRemoveIngredient(index)}
									type='button'
								></RemoveButton>
							</ListContainer>
						)
					})}
					<Button type='button' onClick={addIngredient}>
						Add another ingredient
					</Button>
					<Label>Preparation steps</Label>
					{steps.map((step, index) => {
						return (
							<ListContainer key={index}>
								<h3>{`Step: ${index + 1}`}</h3>
								<DescriptionInput
									type='text'
									style={{ margin: '0 10px', width: '70%' }}
									value={step}
									onChange={e => handleChangeStep(e.target.value, index)}
								/>
								<RemoveButton
									onClick={() => handleRemoveStep(index)}
									type='button'
								></RemoveButton>
							</ListContainer>
						)
					})}
					<Button type='button' onClick={addStep}>
						Add another step
					</Button>
					<SubmitButton type='submit' disabled={isSubmitting || notChanged()}>
						{isSubmitting ? 'Editing...' : 'Edit recipe'}
					</SubmitButton>
				</Form>
			</Wrapper>
			{error ? <ErrorSuccess status='error'>{error}</ErrorSuccess> : null}
			{error === false ? (
				<ErrorSuccess status='success'>
					Recipe was edited successfully
				</ErrorSuccess>
			) : null}
		</>
	)
}

const mapStateToProps = state => ({
	recipe: state.recipe.currentRecipe.currentRecipe,
	error: state.recipe.error
})

export default connect(mapStateToProps, { editRecipe })(Edit)
