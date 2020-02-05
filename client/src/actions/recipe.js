import axios from 'axios'
import history from '../utils/history'
import {
	LOADING,
	CLEAN_STORE,
	CREATE_RECIPE,
	CREATE_RECIPE_FAIL,
	GET_ALL_RECIPES,
	GET_ALL_RECIPES_FAIL,
	GET_RECIPE,
	GET_RECIPE_FAIL,
	EDIT_RECIPE,
	EDIT_RECIPE_FAIL,
	DELETE_RECIPE,
	DELETE_RECIPE_FAIL
} from './types'

export const cleanStore = () => {
	return { type: CLEAN_STORE }
}

export const createRecipe = data => async dispatch => {
	const { name, description, image, servings, time, ingredients, steps } = data
	let newRecipe = new FormData()
	newRecipe.append('name', name)
	newRecipe.append('description', description)
	newRecipe.append('image', image)
	newRecipe.append('servings', servings)
	newRecipe.append('time', time)
	newRecipe.append(
		'ingredients',
		JSON.stringify(ingredients.map(i => i.trim()).filter(i => i))
	)
	newRecipe.append(
		'preparation',
		JSON.stringify(steps.map(i => i.trim()).filter(i => i))
	)
	dispatch({ type: LOADING })
	try {
		await axios.post('/new', newRecipe)
		dispatch({
			type: CREATE_RECIPE
		})
	} catch (err) {
		dispatch({
			type: CREATE_RECIPE_FAIL,
			payload: err.message
		})
	}
}

export const getAllRecipes = page => async dispatch => {
	dispatch({ type: LOADING })
	try {
		const res = await axios.get(`/all?page=${page}`)
		dispatch({
			type: GET_ALL_RECIPES,
			payload: res.data
		})
	} catch (err) {
		dispatch({
			type: GET_ALL_RECIPES_FAIL,
			payload: err.message
		})
	}
}

export const getRecipe = id => async dispatch => {
	dispatch({ type: LOADING })
	try {
		const res = await axios.get(`/recipe/?id=${id}`)
		dispatch({
			type: GET_RECIPE,
			payload: res.data
		})
	} catch (err) {
		dispatch({
			type: GET_RECIPE_FAIL,
			payload:
				err.response.status === 400 ? err.response.data.message : err.message
		})
	}
}

export const editRecipe = (id, data) => async dispatch => {
	const { name, description, image, servings, time, ingredients, steps } = data
	let newRecipe = new FormData()
	newRecipe.append('name', name)
	newRecipe.append('description', description)
	newRecipe.append('image', image)
	newRecipe.append('servings', servings)
	newRecipe.append('time', time)
	newRecipe.append(
		'ingredients',
		JSON.stringify(ingredients.map(i => i.trim()).filter(i => i))
	)
	newRecipe.append(
		'preparation',
		JSON.stringify(steps.map(i => i.trim()).filter(i => i))
	)
	dispatch({ type: LOADING })
	try {
		await axios.post(`/edit/?id=${id}`, newRecipe)
		dispatch({
			type: EDIT_RECIPE
		})
	} catch (err) {
		dispatch({
			type: EDIT_RECIPE_FAIL,
			payload: err.message
		})
	}
}

export const deleteRecipe = id => async dispatch => {
	try {
		await axios.delete(`/delete/?id=${id}`)
		dispatch({
			type: DELETE_RECIPE
		})
		history.push('/some')
	} catch (err) {
		dispatch({
			type: DELETE_RECIPE_FAIL,
			payload: err.message
		})
	}
}
