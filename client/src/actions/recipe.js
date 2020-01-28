import axios from 'axios'
import {
	CREATE_RECIPE,
	CREATE_RECIPE_FAIL,
	GET_ALL_RECIPES,
	GET_ALL_RECIPES_FAIL
} from './types'

export const createRecipe = formData => async dispatch => {
	try {
		const res = await axios.post('/new', formData)
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

export const getAllRecipes = () => async dispatch => {
	try {
		const res = await axios.get('/all')
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
