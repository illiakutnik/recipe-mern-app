import {
	CREATE_RECIPE,
	GET_ALL_RECIPES,
	CREATE_RECIPE_FAIL,
	GET_ALL_RECIPES_FAIL
} from '../actions/types'

const initialState = {
	recipes: [],
	loading: true,
	error: null
}

export default function(state = initialState, action) {
	const { type, payload } = action
	switch (type) {
		case CREATE_RECIPE:
			return { ...state, loading: false }
		case CREATE_RECIPE_FAIL:
			return { ...state, loading: false, error: payload }
		case GET_ALL_RECIPES:
			return { ...state, recipes: payload, loading: false }
		case GET_ALL_RECIPES_FAIL:
			return { ...state, loading: false, error: payload }
		default:
			return state
	}
}
